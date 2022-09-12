import React from "react";
import faker from 'faker';
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import ProfileStatus from "./ProfileStatus";
import { FcVideoCall } from "react-icons/fc";
import { FcPhone } from "react-icons/fc";
import { FcHeadset } from "react-icons/fc";
import { AiOutlineEllipsis } from "react-icons/ai";
import { LoggedInCtx } from "../contexts/LoggedInCtx";

function ChatHeaderGroup({participants}) {
    const [loggedInData, setLoggedInData] = useContext(LoggedInCtx);
    let [usernames, setUsernames] = useState('')

    function avatarUser(){
        let avatar = faker.image.avatar();
        return avatar;
    }

    function getParticipantsString(){
        let usernameArr = [];
        console.log(participants)
        participants.map((user)=>{
            usernameArr.push(user.username);
        });
        if (usernameArr.length > 3){
            // get the first three usernames
            setUsernames(`${usernameArr[0]}, ${usernameArr[1]}, ${usernameArr[2]}...`)
        } else {
            setUsernames(usernameArr.join(','))
        }
    }

    useEffect(()=>{
        getParticipantsString()
    },[])


    return (
        <div className="chat-header-wrapper">
            <div className="ch-profile-wrapper">
                <ProfileStatus image={avatarUser()} status={true} styling={{
                    height: "36px",
                    width: "36px",
                }} />
                <h5>{usernames}</h5>
            </div>
            <div className="ch-controls-wrapper">
                <button><FcVideoCall /></button>
                <button><FcPhone /></button>
                <button><FcHeadset /></button>
                <button><AiOutlineEllipsis /></button>
            </div>
        </div>
    )
}

export default ChatHeaderGroup;