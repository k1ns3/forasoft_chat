import React, { useState } from 'react';
import axios from 'axios';

function Auth({ onLogin }) {
  const [roomId, setRoomId] = useState('');
  const [userName, setUserName] = useState('');
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!roomId || !userName) {
      return alert('Заполните все поля');
    }
    setLoading(true);
    await axios
      .post('/rooms', {
        roomId,
        userName,
      })
      .then(onLogin);
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
      <button
        disabled={isLoading}
        onClick={onSubmit}
        className="btn btn-success">
        {isLoading ? 'ВХОД...' : 'ВОЙТИ'}
      </button>
    </div>
  );
}

export default Auth;
