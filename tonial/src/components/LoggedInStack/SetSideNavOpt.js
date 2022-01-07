import React from 'react';
import {VscChevronRight} from 'react-icons/vsc';
import { Switch } from 'react-router';
import { useState } from 'react';
import { ThemeCtx } from '../contexts/ThemeCtx';
import { SettingsRoutingCtx } from '../contexts/SettingsRoutingCtx';
import {useContext} from 'react';

function SetSideNavOpt({label, icon, altIcon, displayTrigger}) {
    const [currentSettingsView, setCurrentSettingsView] = useContext(SettingsRoutingCtx);

    return (
        <div className="setsidenav-opt-wrapper">
            <button onClick={()=>{
                setCurrentSettingsView(displayTrigger)
            }}>{icon}{label}{altIcon ? altIcon : <VscChevronRight style={{
                margin: "6px"
            }} />}</button>
        </div>
    )
}

export default SetSideNavOpt;