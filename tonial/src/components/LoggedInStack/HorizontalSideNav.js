import React from "react";
import "./stylesheets/sideNav.css";
import { MdOutlineExplore, MdPostAdd, MdRssFeed } from "react-icons/md";
import { BsChatLeftDots} from "react-icons/bs";
import SideNavBtn from "./SideNavBtn";
import { IoIosSettings } from "react-icons/io";
import ReactTooltip from "react-tooltip";
import { HomeRoutingCtx } from "../contexts/HomeRoutingCtx";
import { useContext } from "react";
import SideNavHorBtn from "./SideNavHorBtn";

function HorizontalSideNav() {
  const [currentView, setCurrentView] = useContext(HomeRoutingCtx);

  return (
    <div className="sidenav-h-main-wrapper">
      <ReactTooltip type="dark" effect="float" />
      <div className="sidenav-h-content">
        <SideNavHorBtn icon={<MdOutlineExplore />} tooltip="Explore" btnOnClick={()=>{setCurrentView("Explore")}} active={currentView === "Explore" ? true : false} />
        <SideNavHorBtn icon={<MdRssFeed />} tooltip="Your Feed" btnOnClick={()=>{setCurrentView("Feed")}} active={currentView === "Feed" ? true : false} />
        <SideNavHorBtn icon={<BsChatLeftDots />} tooltip="Chats" btnOnClick={()=>{setCurrentView("Chats")}} active={currentView === "Chats" ? true : false} />
        <SideNavHorBtn icon={<MdPostAdd />} tooltip="Add Post" btnOnClick={()=>{setCurrentView("Add")}} active={currentView === "Add" ? true : false} />
        <SideNavHorBtn icon={<IoIosSettings />} tooltip="Settings" btnOnClick={()=>{setCurrentView("Settings")}} active={currentView === "Settings" ? true : false} />
      </div>
    </div>
  );
}

export default HorizontalSideNav;