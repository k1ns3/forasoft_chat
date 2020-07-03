import React, { useReducer, useEffect } from 'react';
import socket from './socket';
import reducer from './reducer';
import { Join, Chat } from './components';

function App() {
  const [state, dispatch] = useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null,
  });

  const onLogin = (obj) => {
    dispatch({
      type: 'JOINED',
      payload: obj,
    });
    socket.emit('ROOM:JOIN', obj);
  };

  useEffect(() => {
    socket.on('ROOM:JOINED', (users) => {
      console.log('новый юзер', users);
    });
  }, []);

  window.socket = socket;

  return (
    <div className="wrapper">
      {!state.joined ? <Join onLogin={onLogin} /> : <Chat />}
    </div>
  );
}

export default App;
