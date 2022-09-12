import React from 'react';
import { SettingsRoutingCtx } from '../contexts/SettingsRoutingCtx';
import {useContext} from 'react';
import AccountSettings from './SettingsPanes/AccountSettings';
import NotificationSettings from './SettingsPanes/NotificationSettings';
import HelpSettings from './SettingsPanes/HelpSettings';
import AboutSettings from './SettingsPanes/AboutSettings';
import {useEffect} from 'react';
import { ThemeCtx } from '../contexts/ThemeCtx';

function DispSwitchSettings() {
    const [currentSettingsView, setCurrentSettingsView] = useContext(SettingsRoutingCtx);
    const [darkTheme, setDarkTheme] = useContext(ThemeCtx)

    function showCurrentSettingsView(){

        switch (currentSettingsView) {
            case "Account":
                return <AccountSettings />
            case "Notifications":
                return <NotificationSettings />
            case "Help":
                return <HelpSettings />
            case "About":
                return <AboutSettings />
            case darkTheme ? "Dark Mode" : "Light Mode":
                return <AccountSettings />
            default:
                return currentSettingsView
        }
    }

    useEffect(()=>{
        setCurrentSettingsView("Account")
    },[])

    return (
        <div className="settings-disp-main-wrapper">
            {
                showCurrentSettingsView()
            }
        </div>
    )
}

export default DispSwitchSettings;