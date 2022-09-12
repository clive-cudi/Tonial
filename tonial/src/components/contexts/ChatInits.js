import React from 'react';
import { useState } from "react";

export const ChatInits = React.createContext();

export const ChatInitsProvider = ({children}) => {
    const [initializedChats, setInitializedChats] = useState([]);

    return(
        <ChatInits.Provider value={[initializedChats, setInitializedChats]} >
            {children}
        </ChatInits.Provider>
    )
}