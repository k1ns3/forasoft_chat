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
    roomsIds: [],
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
    dispatch({
      type: 'SET_DATA',
      payload: data,
    });
  };

  const setUsers = (users) => {
    dispatch({
      type: 'SET_USERS',
      payload: users,
    });
  };

  const setRooms = (roomsIds) => {
    dispatch({
      type: 'SET_ROOMS',
      payload: roomsIds,
    });
  };

  const addedMessaage = (message) => {
    dispatch({
      type: 'NEW_MESSAGE',
      payload: message,
    });
  };

  useEffect(() => {
    socket.on('ROOM:SET_USERS', setUsers);
    socket.on('ROOM:NEW_MESSAGE', addedMessaage);
    socket.on('ROOM:SET_ROOMS', setRooms);
  }, []);

  window.socket = socket;

  return (
    <div className="wrapper">
      {!state.joined ? (
        <Join onLogin={onLogin} />
      ) : (
        <Chat {...state} onAddMessage={addedMessaage} />
      )}
    </div>
  );
}

export default App;
