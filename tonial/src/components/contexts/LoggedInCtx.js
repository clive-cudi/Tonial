import React from "react";
import { useState } from "react";
import faker from 'faker';
import { useEffect } from "react";

export const LoggedInCtx = React.createContext();

export const LoggedInCtxProvider = ({children}) => {
    const [LoggedInData, setLoggedInData] = useState({
        userName: '',
        avatar: '',
        uid: ''
    });
    return (
        <LoggedInCtx.Provider value={[LoggedInData, setLoggedInData]} >
            {children}
        </LoggedInCtx.Provider>
    )
}