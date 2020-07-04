import React, { useReducer, useEffect } from 'react';
import axios from 'axios';

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

  const onLogin = async (obj) => {
    dispatch({
      type: 'JOINED',
      payload: obj,
    });
    socket.emit('ROOM:JOIN', obj);
    const { data } = await axios.get(`/rooms/${obj.roomId}`);
    setUsers(data.users);
  };

  const setUsers = (users) => {
    dispatch({
      type: 'SET_USERS',
      payload: users,
    });
  };

  useEffect(() => {
    socket.on('ROOM:SET_USERS', setUsers);
    socket.on('ROOM:NEW_MESSAGE', (message) => {
      dispatch({
        type: 'NEW_MESSAGE',
        payload: message,
      });
    });
  }, []);

  window.socket = socket;

  return (
    <div className="wrapper">
      {!state.joined ? <Join onLogin={onLogin} /> : <Chat {...state} />}
    </div>
  );
}

export default App;
