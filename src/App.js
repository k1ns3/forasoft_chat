import React, { useReducer } from 'react';
import socket from './socket';
import reducer from './reducer';
import { Auth } from './components';

function App() {
  const [state, dispatch] = useReducer(reducer, {
    joined: false,
  });

  const onLogin = () => {
    dispatch({
      type: 'JOINED',
      payload: true,
    });
  };

  return (
    <div className="wrapper">{!state.isAuth && <Auth onLogin={onLogin} />}</div>
  );
}

export default App;
