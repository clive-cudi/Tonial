import React from "react";
import { useState } from "react";

export const ThemeCtx = React.createContext();

export const ThemeCtxProvider = ({children}) =>{
    const [darkTheme, setDarkTheme] = useState(true);

    return (
        <ThemeCtx.Provider value={[darkTheme, setDarkTheme]} >
            {children}
        </ThemeCtx.Provider>
    )
}