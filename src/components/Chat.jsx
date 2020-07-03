import React from 'react';

import socket from '../socket';

function Chat({ users, messages, userName, roomId, onAddMessage }) {
  const [messageValue, setMessageValue] = React.useState('');

  return (
    <div className="chat">
      <div className="chat-users">
        <b>Онлайн (1):</b>
        <ul>
          <li>Test User</li>
        </ul>
      </div>
      <div className="chat-messages">
        <div className="messages">
          <div className="message">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis
              reprehenderit tempore rerum quidem cumque quibusdam consequatur
            </p>
            <div>
              <span>Test user</span>
            </div>
          </div>
          <div className="message">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis
              reprehenderit tempore rerum quidem cumque quibusdam consequatur
            </p>
            <div>
              <span>Test user</span>
            </div>
            <form>
              <textarea
                value={messageValue}
                onChange={(e) => setMessageValue(e.target.value)}
                className="form-control"
                rows="3"></textarea>
              <button type="button" className="btn btn-primary">
                Отправить
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
