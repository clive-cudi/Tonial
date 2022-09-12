import React from "react";
import "./stylesheets/message.css";

function SentMsg({ msg, avatar }) {
  return (
    <div className="sent-main-wrapper">
      <div className="st-avatar-wrapper">
        <div className="st-avatar">
          <img src={avatar} alt="!@" />
        </div>
      </div>
      <div className="st-txt-wrapper">
      <div className="st-wrapper">
        <h5>{msg}</h5>
      </div>
      </div>
    </div>
  );
}

export default SentMsg;