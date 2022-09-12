import React from 'react';
import ChatList from './ChatList';
import ChatArea from './ChatArea';
import './stylesheets/chats.css';
import { ThemeCtx } from '../contexts/ThemeCtx';
import {useContext} from 'react';

function Chats() {
    const [darkTheme, setDarkTheme] = useContext(ThemeCtx);

    return (
        <div className="chats-main-wrapper" style={{
            background: !darkTheme && "rgb(248, 248, 248)",
        }}>
            <ChatList />
            <ChatArea />
        </div>
    )
}

export default Chats;