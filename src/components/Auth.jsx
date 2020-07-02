import React, { useState } from 'react';
import axios from 'axios';

import socket from '../socket';

function Auth() {
  const [roomId, setRoomId] = useState('');
  const [userName, setUserName] = useState('');

  const onSubmit = () => {
    if (!roomId || !userName) {
      return alert('Заполните все поля');
    }
    axios.post('/rooms', {
      roomId,
      userName,
    });
  };

  return (
    <div className="join-block">
      <input
        type="text"
        placeholder="Room ID"
        value={roomId}
        onChange={(event) => setRoomId(event.target.value)}
      />
      <input
        type="text"
        placeholder="Ваше имя"
        value={userName}
        onChange={(event) => setUserName(event.target.value)}
      />
      <button onClick={onSubmit} className="btn btn-success">
        ВОЙТИ
      </button>
    </div>
  );
}

export default Auth;
