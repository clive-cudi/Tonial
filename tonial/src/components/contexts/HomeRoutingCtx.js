import React from "react";
import { useState } from "react";

export const HomeRoutingCtx = React.createContext();

export const HomeRoutingCtxProvider = ({children}) => {
    const [currentView, setCurrentView] = useState("chats");

    return (
        <HomeRoutingCtx.Provider value={[currentView, setCurrentView]} >
            {children}
        </HomeRoutingCtx.Provider>
    )
}