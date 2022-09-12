import React from "react";
import "./stylesheets/sideNav.css";
import { MdOutlineExplore, MdPostAdd, MdRssFeed } from "react-icons/md";
import { BsChatLeftDots} from "react-icons/bs";
import SideNavBtn from "./SideNavBtn";
import { IoIosSettings } from "react-icons/io";
import ReactTooltip from "react-tooltip";
import { HomeRoutingCtx } from "../contexts/HomeRoutingCtx";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ThemeCtx } from "../contexts/ThemeCtx";

function SideNav() {
  const [currentView, setCurrentView] = useContext(HomeRoutingCtx);
  const [isMobile, setMobile] = useState(false);
  const [darkTheme, setDarkTheme] = useContext(ThemeCtx)

  useEffect(()=>{
    if(window.innerWidth < 860){
      setMobile(true)
    } else {
      setMobile(false)
    }
  },[])

  return (
    <div className="sidenav-main-wrapper">
      {
        isMobile === false &&   <ReactTooltip type="dark" effect="float" />
      }
      <div className="sidenav-content" style={{
        background: !darkTheme && "rgb(248, 248, 248)",
        border: !darkTheme && "0.2px solid rgba(175, 175, 175, 0.781)",
        padding: !darkTheme && "9px"
      }}>
        <SideNavBtn icon={<MdOutlineExplore />} tooltip="Explore" btnOnClick={()=>{setCurrentView("Explore")}} active={currentView === "Explore" ? true : false} />
        <SideNavBtn icon={<MdRssFeed />} tooltip="Your Feed" btnOnClick={()=>{setCurrentView("Feed")}} active={currentView === "Feed" ? true : false} />
        <SideNavBtn icon={<BsChatLeftDots />} tooltip="Chats" btnOnClick={()=>{setCurrentView("Chats")}} active={currentView === "Chats" ? true : false} />
        <SideNavBtn icon={<MdPostAdd />} tooltip="Add Post" btnOnClick={()=>{setCurrentView("Add")}} active={currentView === "Add" ? true : false} />
        <SideNavBtn icon={<IoIosSettings />} tooltip="Settings" btnOnClick={()=>{setCurrentView("Settings")}} active={currentView === "Settings" ? true : false} />
      </div>
    </div>
  );
}

export default SideNav;