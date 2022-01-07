import React, { useState } from 'react';

export const ChatsCtx = React.createContext();

export const ChatsCtxProvider = ({children}) =>{
    const [chats, setChats] = useState([]);

    return (
        <ChatsCtx.Provider value={[chats, setChats]} >
            {children}
        </ChatsCtx.Provider>
    )
}