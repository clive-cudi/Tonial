import React from "react";
import "./stylesheets/message.css";

function ReceivedMsg({ msg, avatar }) {
  return (
    <div className="received-main-wrapper">
      <div className="rc-avatar-wrapper">
        <div className="rc-avatar">
          <img src={avatar} alt="!@" />
        </div>
      </div>
      <div className="rc-txt-wrapper">
        <div className="rc-wrapper">
          <h5>{msg}</h5>
        </div>
      </div>
    </div>
  );
}

export default ReceivedMsg;
