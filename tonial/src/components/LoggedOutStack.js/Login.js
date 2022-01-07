import React from "react";
import "./stylesheets/login.css";
import { FcHeadset } from "react-icons/fc";
import { AiOutlineUser } from "react-icons/ai";
import { BsKey } from "react-icons/bs";
import Button from "./Button";
import { AiOutlineSend } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { useState } from "react";
import { db } from "./firebase/firebase";
import { doc } from "@firebase/firestore";
import { getDoc } from "@firebase/firestore";
import { useContext } from "react";
import { AuthStatusCtx } from "../contexts/AuthStatusCtx";
import faker from "faker";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [authsuccess, setAuthStatus] = useState(false);
  const [submittedOnce, setSubmittedOnce] = useState(false);
  // eslint-disable-next-line
  const [GlobalAuthStatus, setGlobalAuthStatus] = useContext(AuthStatusCtx);

  function handleSubmit() {
    setSubmittedOnce(true);
    if (username !== "") {
      if (password !== "") {
        setSubmitting(true);
        getDoc(doc(db, "users", username))
          .then((snapshot) => {
            if (snapshot.exists()) {
              if (
                snapshot.data().userName === username &&
                snapshot.data().password === password
              ) {
                setAuthStatus(true);
                setSubmitting(false);
                localStorage.setItem("tonialUser", username);
                localStorage.setItem("LoggedIn", true);
                localStorage.setItem("uid", snapshot.data().uid);
                axios
                  .get(
                    "http://localhost:4767/user/getprofilepic?uid=" +
                      snapshot.data().uid
                  )
                  .then((res) => {
                    localStorage.setItem("email", res.data.email);
                    localStorage.setItem("tonialAbout", res.data.about == null ? null : res.data.about);
                    if (res.data.result == null) {
                      localStorage.setItem("avatar", null);
                      window.location.href = "/";
                    } else {
                      localStorage.setItem("avatar", res.data.result);
                      window.location.href = "/";
                    }
                  })
                  .catch((e) => {
                    console.log(e);
                  });
                
                setGlobalAuthStatus(true);
              } else {
                // invalid Username or password
                setAuthStatus(false);
                setSubmitting(false);
              }
            } else {
              setAuthStatus(false);
              setSubmitting(false);
            }
          })
          .catch((e) => {
            console.log(e);
            setSubmitting(false);
          });
      }
    }
  }

  return (
    <div className="login-main-wrapper">
      <div className="login-wrapper">
        <div className="logo-wrapper">
          <div className="logo">
            <FcHeadset />
          </div>
          <div className="login-title-wrapper">
            <h2>Tonial</h2>
          </div>
        </div>
        <div className="form-wrapper">
          <div className="form-title">
            <div className="min-logo-wrapper">
              <div className="min-logo">
                <FcHeadset />
              </div>
              <div className="min-login-title-wrapper">
                <h2>Tonial</h2>
              </div>
            </div>
            <h2>Login</h2>
          </div>
          <div className="form-inputs">
            <div className="form-input-div">
              <AiOutlineUser />
              <input
                type="text"
                placeholder="Enter Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="form-input-div">
              <BsKey />
              <input
                type="password"
                placeholder="Enter Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div
              style={{
                height: "20px",
                width: "100%",
                alignItems: "center",
              }}
            >
              {submittedOnce ? (
                submitting === false && authsuccess === false ? (
                  <p style={{ color: "crimson", fontSize: "14px" }}>
                    * Invalid Login Credentials
                  </p>
                ) : submitting === false ? (
                  <p style={{ color: "chartreuse", fontSize: "14px" }}>
                    Correct Login Credentials
                  </p>
                ) : (
                  <p></p>
                )
              ) : (
                <p></p>
              )}
            </div>
            <div className="form-submit-div">
              <Button
                icon={<AiOutlineSend fontSize="26px" />}
                label={`Login`}
                style={{
                  height: "40px",
                  fontSize: "14px",
                }}
                wrapperStyle={{
                  height: "60px",
                }}
                onclick={() => {
                  handleSubmit();
                }}
                busy={submitting === true ? true : false}
              />
            </div>
            <div className="login-alts-wrapper">
              <Button
                icon={<FcGoogle fontSize="26px" />}
                label={`Login with Google`}
                style={{
                  height: "40px",
                  fontSize: "14px",
                }}
              />
              <Button
                icon={<BsFacebook fontSize="26px" />}
                label={`Login with Facebook`}
                style={{
                  height: "40px",
                  fontSize: "14px",
                }}
              />
              <a href="/signup">No account? Sign up</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
