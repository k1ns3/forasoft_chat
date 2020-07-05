const express = require('express');
const { request, response } = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.json());

const rooms = new Map([]);

app.get('/rooms/:id', (request, response) => {
  const { id: roomId } = request.params;
  console.log(roomId);

  const obj = rooms.has(roomId)
    ? {
        users: [...rooms.get(roomId).get('users').values()],
        messages: [...rooms.get(roomId).get('messages').values()],
        roomsIds: [...rooms.keys()],
      }
    : { users: [], messages: [], roomsIds: [] };
  response.json(obj);
});

app.post('/rooms', (request, response) => {
  const { roomId, userName } = request.body;

  if (!rooms.has(roomId)) {
    rooms.set(
      roomId,
      new Map([
        ['users', new Map()],
        ['messages', []],
        ['rooms', []],
      ])
    );
  }
  response.send();
});

io.on('connection', (socket) => {
  socket.on('ROOM:JOIN', ({ roomId, userName }) => {
    socket.join(roomId);
    rooms.get(roomId).get('users').set(socket.id, userName);
    const users = [...rooms.get(roomId).get('users').values()];
    socket.to(roomId).broadcast.emit('ROOM:SET_USERS', users);
    const roomsIds = [...rooms.keys()];
    socket.to(roomId).broadcast.emit('ROOM:SET_ROOMS', roomsIds);
    console.log('Комнаты: ', roomsIds);
  });

  socket.on('ROOM:NEW_MESSAGE', ({ roomId, userName, text, time }) => {
    const obj = {
      userName,
      text,
      time,
    };
    rooms.get(roomId).get('messages').push(obj);
    socket.to(roomId).broadcast.emit('ROOM:NEW_MESSAGE', obj);
  });

  socket.on('disconnect', () => {
    rooms.forEach((value, roomId) => {
      if (value.get('users').delete(socket.id)) {
        const users = [...rooms.get(roomId).get('users').values()];
        socket.to(roomId).broadcast.emit('ROOM:SET_USERS', users);
      }
    });
  });

  console.log('user connected', socket.id);
});

server.listen(8080, (err) => {
  if (err) {
    throw Error(err);
  }
  console.log('Server is work');
});
