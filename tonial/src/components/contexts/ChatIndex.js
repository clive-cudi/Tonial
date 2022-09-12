import React, { useState } from "react";

export const ChatIndex = React.createContext();

export const ChatIndexProvider = ({children}) => {
    const [currentChatIndex, setCurrentChatIndex] = useState(0);

    return (
        <ChatIndex.Provider value={[currentChatIndex, setCurrentChatIndex]} >
            {children}
        </ChatIndex.Provider>
    )
}