import React from 'react';
import {useState} from 'react';

export const SettingsRoutingCtx = React.createContext();

export const SettingsRoutingCtxProvider = ({children}) => {
    const [currentSettingsView, setCurrentSettingsView] = useState('account');

    return (
        <SettingsRoutingCtx.Provider value={[currentSettingsView, setCurrentSettingsView]} >
            {children}
        </SettingsRoutingCtx.Provider>
    )
}