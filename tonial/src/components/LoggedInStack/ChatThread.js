import { date } from "faker";
import React from "react";
import SentMsg from "./SentMsg";
import ReceivedMsg from "./ReceivedMsg";
import faker from "faker";
import { useContext } from "react";
import { LoggedInCtx } from "../contexts/LoggedInCtx";

function ChatThread({thread, altPic}) {
  const [avatar] = useContext(LoggedInCtx)
  const avatar2 = faker.image.avatar();

  // sort the thread according to date
  return (
    <div className="ct-main-wrapper">
      {thread?.map((txt) => {
        if (txt?.senderuid !== localStorage.getItem('uid')) {
          return <ReceivedMsg key={thread?.indexOf(txt)} msg={txt?.text} avatar={altPic} />;
        } else if (txt?.senderuid === localStorage.getItem('uid')) {
          return <SentMsg key={thread?.indexOf(txt)} msg={txt?.text} avatar={localStorage.getItem('avatar')} />;
        }
      })}
    </div>
  );
}

export default ChatThread;