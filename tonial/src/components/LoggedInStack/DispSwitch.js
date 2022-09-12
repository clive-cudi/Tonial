import React from 'react';
import { useContext } from 'react';
import { HomeRoutingCtx } from '../contexts/HomeRoutingCtx';
import Chats from './Chats';
import Explore from './Explore';
import Feed from './Feed';
import Settings from './Settings';
import AddPost from './AddPost';
import { useEffect } from 'react';
import { ThemeCtx } from '../contexts/ThemeCtx';

function DispSwitch() {
    const [currentView, setCurrentView] = useContext(HomeRoutingCtx);
    const [darkTheme, setDarkTheme] = useContext(ThemeCtx)

    function showCurrentView(){
        switch (currentView) {
            case "Explore":
                return <Explore />
            case "Feed":
                return <Feed />
            case "Chats":
                return <Chats />
            case "Add":
                return <AddPost />
            case "Settings":
                return <Settings />
            default:
                return <Chats />
        }
    }
    
    useEffect(()=>{
        setCurrentView("Chats")
        // eslint-disable-next-line
    }, [])

    return (
        <div className="disp-main-wrapper" style={{
            background: !darkTheme && "rgb(248, 248, 248)",
            border: !darkTheme && "0.3px solid rgba(175, 175, 175, 0.781)",
        }}>
            {
                showCurrentView()
            }
        </div>
    )
}

export default DispSwitch;