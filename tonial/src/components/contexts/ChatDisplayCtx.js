import React from "react";
import { useState } from "react";

export const ChatDisplayCtx = React.createContext();

export const ChatDisplayCtxProvider = ({ children }) => {
  const [currentChat, setCurrentChat] = useState({
    _id: "617f4d9d6b93515bdb655111",
    chatId: "",
    chatType: null,
    participants: [],
    thread: [],
    createdAt: "2021-11-01T02:14:53.635Z",
    updatedAt: "2021-11-01T02:14:53.635Z",
    __v: 0,
  });

  return (
    <ChatDisplayCtx.Provider value={[currentChat, setCurrentChat]}>
      {children}
    </ChatDisplayCtx.Provider>
  );
};
