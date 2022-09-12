import React from 'react';
import './stylesheets/chatarea.css';
import ChatsDisplay from './ChatsDisplay';
import ChatInfo from './ChatInfo';

function ChatArea() {
    return (
        <div className="ca-main-wrapper">
            <ChatsDisplay />
            <ChatInfo />
        </div>
    )
}

export default ChatArea;