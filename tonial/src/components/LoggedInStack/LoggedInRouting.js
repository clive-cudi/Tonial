import React from "react";
import { BrowserRouter,Routes , Route } from "react-router-dom";
import Home from "./Home";
import { useEffect } from "react";
import { useContext } from "react";
import { LoggedInCtx } from "../contexts/LoggedInCtx";
import { HomeRoutingCtxProvider } from "../contexts/HomeRoutingCtx";
import { ChatDisplayCtxProvider } from "../contexts/ChatDisplayCtx";
import { ModalCtxProvider } from "../contexts/ModalCtx";
import { ChatInitsProvider } from "../contexts/ChatInits";
import { ChatsCtxProvider } from "../contexts/ChatsCtx";
import { ChatIndexProvider } from "../contexts/ChatIndex";
import { SettingsRoutingCtxProvider } from "../contexts/SettingsRoutingCtx";
import axios from 'axios';

function LoggedInRouting() {
  // eslint-disable-next-line
  const [LoggedInData, setLoggedInData] = useContext(LoggedInCtx);

  useEffect(() => {
    const currentUser = localStorage.getItem("tonialUser");
    const profile = localStorage.getItem("avatar");
    const uid = localStorage.getItem("uid");
    setLoggedInData({ userName: currentUser, avatar: profile, uid: uid });
    // eslint-disable-next-line
  }, []);

  return (
    <HomeRoutingCtxProvider>
      <SettingsRoutingCtxProvider>
        <ChatDisplayCtxProvider>
          <ModalCtxProvider>
            <ChatInitsProvider>
              <ChatsCtxProvider>
                <ChatIndexProvider>
                  <div className="content">
                  <BrowserRouter>
                    <Routes>
                      <Route path="/" element={<Home />} />
                    </Routes>
                    </BrowserRouter>
                  </div>
                </ChatIndexProvider>
              </ChatsCtxProvider>
            </ChatInitsProvider>
          </ModalCtxProvider>
        </ChatDisplayCtxProvider>
      </SettingsRoutingCtxProvider>
    </HomeRoutingCtxProvider>
  );
}

export default LoggedInRouting;
