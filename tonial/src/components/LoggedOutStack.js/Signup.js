import React from "react";
import "./stylesheets/login.css";
import { FcHeadset } from "react-icons/fc";
import { AiOutlineUser } from "react-icons/ai";
import { BsKey } from "react-icons/bs";
import Button from "./Button";
import { AiOutlineSend } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { FcHighPriority } from "react-icons/fc";
import ReactTooltip from "react-tooltip";
import { db } from "./firebase/firebase";
import { doc } from "@firebase/firestore";
import { setDoc } from "@firebase/firestore";
import axios from 'axios';
import * as genUID from "./firebase/UserIDgenerator";

function Signup() {
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPass, setConfirmationPass] = useState("");
  const [correctInput, setCorrectInput] = useState(false);
  const [correctEmail, setCorrectEmail] = useState(false);
  const [strongPass, setStrongPass] = useState(false);
  const [strongPassConfirm, setStrongPassConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const urlHeader = `http://localhost:4767`;

  function checkUsername(name) {
    if (InputCheck(name)) {
      setCorrectInput(true);
      return true;
    } else {
      setCorrectInput(false);
      return false;
    }
  }

  function checkEmail(mail) {
    if (validateEmail(email)) {
      setCorrectEmail(true);
      return true;
    } else {
      setCorrectEmail(false);
      return false;
    }
  }

  function checkPass(pass) {
    if (validatePass(pass)) {
      setStrongPass(true);
      return true;
    } else {
      setStrongPass(false);
      return false;
    }
  }

  function checkPassConfirm(pass) {
    if (validatePass(pass)) {
      setStrongPassConfirm(true);
      return true;
    } else {
      setStrongPassConfirm(false);
      return false;
    }
  }

  function InputCheck(input) {
    if (input.length >= 4) {
      let regex = /^[A-Za-z0-9_ ]+$/;

      let isValid = regex.test(input);
      if (!isValid) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  function validateEmail(emailAddr) {
      // eslint-disable-next-line
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailAddr.match(regexEmail)) {
        // eslint-disable-next-line
      return true;
    } else {
      return false;
    }
  }
  function validatePass(pass) {
    if (pass.length >= 6) {
      var strongRegex = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})"
      );
      if (pass.match(strongRegex)) {
        return true;
      } else {
        return false;
      }
    }
  }

  function validation() {
    if (strongPass === true) {
      if (correctInput && correctEmail) {
        if (strongPassConfirm === true) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  function handleSubmit() {
      if (validation() === true) {
        const uid = genUID(userName);
        setDoc(doc(db, "users", userName), {
          userName: userName,
          uid: uid,
          email: email,
          password: password,
        })
          .then(() => {
            console.log(
              `Credentials set:\nusername: ${userName}\nemail: ${email}\npassword: ${password}`
            );
            axios.post(`${urlHeader}/user/adduser`,{
              username: userName,
              uid: uid,
              email: email
            }).then((res)=>{
              console.log(res)
              window.location.href = '/login'
            }).catch((e)=>{
              console.log(e)
            })
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        console.log("incorrect credentials");
      }
  }

  return (
    <div className="login-main-wrapper">
      <ReactTooltip place="top" type="dark" effect="float" />
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
            <h2>Sign up</h2>
          </div>
          <div className="form-inputs">
            <div className="form-input-div">
              <AiOutlineUser />
              <input
                type="text"
                placeholder="Enter Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                  checkUsername(e.target.value);
                }}
              />
              <p
                data-tip={
                  correctInput
                    ? "Correct Username Format"
                    : "Username should be at least 4 characters and only contain _ special character"
                }
              >
                {userName !== "" ? (
                  correctInput === true ? (
                    <AiOutlineCheck color="chartreuse" />
                  ) : (
                    <FcHighPriority />
                  )
                ) : (
                  <span></span>
                )}
              </p>
            </div>
            <div className="form-input-div">
              <AiOutlineMail />
              <input
                type="email"
                placeholder="Enter Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  checkEmail(e.target.value);
                }}
              />
              <ReactTooltip place="top" type="dark" effect="float" />
              <p
                data-tip={
                  correctEmail
                    ? "Correct Email Format"
                    : "Incorrect Email format"
                }
              >
                {email !== "" ? (
                  correctEmail === true ? (
                    <AiOutlineCheck color="chartreuse" />
                  ) : (
                    <FcHighPriority />
                  )
                ) : (
                  console.log("incorrect")
                )}
              </p>
            </div>
            <div className="form-input-div">
              <BsKey />
              <input
                type="password"
                placeholder="Enter Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  checkPass(e.target.value);
                }}
              />
              <ReactTooltip
                place="top"
                type="dark"
                effect="float"
                multiline={true}
              />
              <p
                data-tip={
                  strongPass
                    ? "Correct Password Format"
                    : "Password should be at least:1 special character, 1 uppercase letter and is at least 6 characters"
                }
              >
                {password !== "" ? (
                  strongPass === true ? (
                    <AiOutlineCheck color="chartreuse" />
                  ) : (
                    <FcHighPriority />
                  )
                ) : (
                  <span></span>
                )}
              </p>
            </div>
            <div className="form-input-div">
              <BsKey />
              <input
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => {
                  setConfirmationPass(e.target.value);
                  checkPassConfirm(e.target.value);
                }}
              />
              <ReactTooltip place="top" type="dark" effect="float" />
              <p
                data-tip={
                  strongPassConfirm
                    ? "Correct Password Format"
                    : "Incorrect Password format"
                }
              >
                {confirmationPass !== "" ? (
                  strongPassConfirm === true ? (
                    <AiOutlineCheck color="chartreuse" />
                  ) : (
                    <FcHighPriority />
                  )
                ) : (
                  <span></span>
                )}
              </p>
            </div>
            <div className="form-submit-div">
              <Button
                icon={<AiOutlineSend fontSize="26px" />}
                label={`Create Account`}
                style={{
                  height: "40px",
                  fontSize: "14px",
                }}
                wrapperStyle={{
                  height: "60px",
                  minHeight: "60px",
                }}
                onclick={()=>{
                  handleSubmit();
                  setSubmitting(true)
                }}
                busy={submitting === true ? true : false}
              />
            </div>
            <div
              className="login-alts-wrapper"
              style={{
                height: "160px",
              }}
            >
              <Button
                icon={<FcGoogle fontSize="26px" />}
                label={`Sign up with Google`}
                style={{
                  height: "36px",
                  fontSize: "14px",
                }}
              />
              <Button
                icon={<BsFacebook fontSize="26px" />}
                label={`Sign up with Facebook`}
                style={{
                  height: "36px",
                  fontSize: "14px",
                }}
              />
              <a href="/login">I have an account ! Login</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;