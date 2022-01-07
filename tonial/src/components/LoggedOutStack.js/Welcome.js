import React from "react";
import "./stylesheets/welcome.css";
import Button from "./Button";
import { AiOutlineUserAdd } from "react-icons/ai";
import { IoLogIn } from "react-icons/io5";
import { FcHeadset } from "react-icons/fc";

function Welcome({ link }) {
  return (
    <div className="welcome-main-wrapper">
      <div className="welcome-wrapper">
        <div className="welcome-logo-wrapper">
          <div className="welcome-logo">
            <FcHeadset />
          </div>
          <div className="welcome-login-title-wrapper">
            <h2>Tonial</h2>
          </div>
        </div>
        <div className="welcome-content">
          <a href="/login">
            <Button label={`Login`} icon={<IoLogIn />} />
          </a>
          <a href="/signup">
            <Button label={`Sign up`} icon={<AiOutlineUserAdd />} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Welcome;