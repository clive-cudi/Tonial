import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export const AuthStatusCtx = React.createContext();

export const AuthStatusCtxProvider = ({children}) => {
    const [GlobalAuthStatus, setGlobalAuthStatus] = useState(false);

    useEffect(()=>{
        const status = localStorage.getItem("LoggedIn")

        if (status === 'true'){
            setGlobalAuthStatus(true)
        } else {
            setGlobalAuthStatus(false)
        }
    },[])

    return (
        <AuthStatusCtx.Provider value={[GlobalAuthStatus, setGlobalAuthStatus]} >
            {children}
        </AuthStatusCtx.Provider>
    )
}