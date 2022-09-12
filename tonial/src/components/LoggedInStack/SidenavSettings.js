import React from 'react';
import { useState } from 'react';
import SetSideNavOpt from './SetSideNavOpt';
import {FcManager, FcCustomerSupport, FcAssistant, FcInfo} from 'react-icons/fc';
import {MdNotificationsActive} from 'react-icons/md';
import {BsFillMoonStarsFill} from 'react-icons/bs';
import {FiSun} from 'react-icons/fi';
import { useContext } from 'react';
import { ThemeCtx } from '../contexts/ThemeCtx';
import Switch from "react-switch";


function SidenavSettings() {
    const [darkTheme, setDarkTheme] = useContext(ThemeCtx);
    const [options, setOptions] = useState([
        {
            option: "Notifications",
            iconClass: <MdNotificationsActive style={{fontSize: "20px"}} />
        },
        {
            option: darkTheme ? 'Light Mode' : 'Dark Mode',
            iconClass: darkTheme ? <FiSun style={{fontSize: "20px"}} /> : <BsFillMoonStarsFill style={{fontSize: "20px"}} />
        },
        {
            option: "Help",
            iconClass: <FcCustomerSupport style={{fontSize: "20px"}} />
        },
        {
            option: "About",
            iconClass: <FcInfo style={{
                fontSize: "20px"
            }} />
        },
    ]);

    function toggleTheme(){
        if (darkTheme == true){
            setDarkTheme(false);
        } else {
            setDarkTheme(true);
        }
    }

    return (
        <div className="setsidenav">
            <div className="setsidenav-title-wrapper">
                <h1>Settings</h1>
            </div>
            <div className="setsidenav-options-wrapper">
                <div className="setsidenav-options-header">
                    <h2>Account</h2>
                </div>
                <SetSideNavOpt label={localStorage.getItem("tonialUser")} icon={<FcManager style={{fontSize: "20px"}} />} displayTrigger="Account" />
                <div className="setsidenav-options-header">
                    <h2>General Settings</h2>
                </div>
                {
                    options.map((opt)=>{
                        if (opt.option == 'Dark Mode' || opt.option == 'Light Mode') {
                            return <SetSideNavOpt label={darkTheme ? 'Light Mode' : 'Dark Mode'} icon={darkTheme ? <FiSun style={{fontSize: "20px"}} /> : <BsFillMoonStarsFill style={{fontSize: "20px"}} />} altIcon={<Switch onChange={toggleTheme} checked={darkTheme} uncheckedIcon={false} checkedIcon={false} onColor='#ffffff' onHandleColor="#cccccc" />} displayTrigger={darkTheme ? 'Light Mode' : 'Dark Mode'} />
                        } else {
                            return <SetSideNavOpt label={opt.option} icon={opt.iconClass} displayTrigger={opt.option} />
                        }
                    })
                }
            </div>
        </div>
    )
}

export default SidenavSettings;