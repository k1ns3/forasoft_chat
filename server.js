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
  console.log('user connected', socket.id);
});

server.listen(8080, (err) => {
  if (err) {
    throw Error(err);
  }
  console.log('Server is work');
});
