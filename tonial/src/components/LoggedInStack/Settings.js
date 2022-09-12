import React from 'react';
import SidenavSettings from './SidenavSettings';
import './stylesheets/settingsidenav.css';
import DispSwitchSettings from './DispSwitchSettings';
import {useContext} from 'react';
import { ThemeCtx } from '../contexts/ThemeCtx';

function Settings() {
    const [darkTheme] = useContext(ThemeCtx);

    return (
        <div className="chats-main-wrapper" style={{
            background: !darkTheme && "rgb(248, 248, 248)",
        }}>
            <SidenavSettings />
            <DispSwitchSettings />
        </div>
    )
}

export default Settings;