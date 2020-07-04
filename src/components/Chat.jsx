import React, { useState, useRef, useEffect } from 'react';

import socket from '../socket';

function Chat({ users, messages, userName, roomId, onAddMessage }) {
  const [messageValue, setMessageValue] = useState('');
  const messageRef = useRef(null);

  const onSendMessage = () => {
    if (messageValue !== '') {
      socket.emit('ROOM:NEW_MESSAGE', {
        userName,
        roomId,
        text: messageValue,
        time: getTimeSentMessage(),
      });
      onAddMessage({
        userName,
        text: messageValue,
        time: getTimeSentMessage(),
      });
      setMessageValue('');
    }
  };

  const getTimeSentMessage = () => new Date().toLocaleTimeString().slice(0, -3);

  useEffect(() => {
    messageRef.current.scrollTo(0, 99999999);
  }, [messages]);

  return (
    <div className="chat">
      <div className="chat-users">
        Комната: <strong>{roomId}</strong>
        <hr />
        <b>Пользователей онлайн ({users.length}):</b>
        <ul>
          {users.map((name, index) => (
            <li key={`${name}_${index}`}>{name}</li>
          ))}
        </ul>
      </div>
      <div className="chat-messages">
        <div ref={messageRef} className="messages">
          {messages &&
            messages.map((message, index) => (
              <div key={`${message}_${index}`} className="message">
                <p>{message.text}</p>
                <div>
                  <span>
                    <strong>{message.userName}</strong>
                  </span>
                  <span>{message.time}</span>
                </div>
              </div>
            ))}
        </div>
        <form>
          <textarea
            placeholder="Напишите сообщение..."
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
  );
}

export default Chat;
