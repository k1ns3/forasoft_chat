const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.json());

const rooms = new Map([]);

app.get('/rooms', (request, response) => {
  response.json(rooms);
});

app.post('/rooms', (request, response) => {
  const { roomId, userName } = request.body;

  if (!rooms.has(roomId)) {
    rooms.set(
      roomId,
      new Map([
        ['users', new Map()],
        ['messages', []],
      ])
    );
  }
  response.send();
});

io.on('connection', (socket) => {
  socket.on('ROOM:JOIN', ({ roomId, userName }) => {
    socket.join(roomId);
    // Комната в коллекции, с коллекцией юзеров, у каждого юзера сфой socket id
    rooms.get(roomId).get('users').set(socket.id, userName);
    // Список всех пользователей в комнате
    const users = [...rooms.get(roomId).get('users').values()];
    // Все пользователи кроме меня получают список всех юзеров
    socket.to(roomId).broadcast.emit('ROOM:JOINED', users);
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
