import React, { useState } from 'react';

import socket from '../socket';

function Chat({ users, messages, userName, roomId, onAddMessage }) {
  const [messageValue, setMessageValue] = useState('');

  const onSendMessage = () => {
    socket.emit('ROOM:NEW_MESSAGE', {
      userName,
      roomId,
      text: messageValue,
    });
    setMessageValue('');
  };

  return (
    <div className="chat">
      <div className="chat-users">
        <b>Пользователей онлайн ({users.length}):</b>
        <ul>
          {users.map((name, index) => (
            <li key={`${name}_${index}`}>{name}</li>
          ))}
        </ul>
      </div>
      <div className="chat-messages">
        <div className="messages">
          {messages &&
            messages.map((message) => (
              <div className="message">
                <p>{message.text}</p>
                <div>
                  <span>{message.userName}</span>
                </div>
              </div>
            ))}
          <form>
            <textarea
              value={messageValue}
              onChange={(e) => setMessageValue(e.target.value)}
              className="form-control"
              rows="3"></textarea>
            <button
              onClick={onSendMessage}
              type="button"
              className="btn btn-primary">
              Отправить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;
