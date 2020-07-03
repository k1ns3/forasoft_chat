import React, { useReducer, useEffect } from 'react';
import socket from './socket';
import reducer from './reducer';
import { Join, Chat } from './components';

function App() {
  const [state, dispatch] = useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null,
    users: [],
    messages: [],
  });

  const onLogin = (obj) => {
    dispatch({
      type: 'JOINED',
      payload: obj,
    });
    socket.emit('ROOM:JOIN', obj);
  };

  const setUsers = (users) => {
    dispatch({
      type: 'SET_USERS',
      payload: users,
    });
  };

  useEffect(() => {
    socket.on('ROOM:JOINED', setUsers);
    socket.on('ROOM:SET_USERS', setUsers);
  }, []);

  window.socket = socket;

  return (
    <div className="wrapper">
      {!state.joined ? <Join onLogin={onLogin} /> : <Chat {...state} />}
    </div>
  );
}

export default App;
