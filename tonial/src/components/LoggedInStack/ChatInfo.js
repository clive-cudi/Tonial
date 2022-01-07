import React, { useContext } from 'react'
import { ChatDisplayCtx } from '../contexts/ChatDisplayCtx';
import './stylesheets/chatInfo.css';
import faker from 'faker';
import Participant from './Participant';
import avatarOutline from '../assets/avatar_outline.png';

function ChatInfo() {
    const [currentChat] = useContext(ChatDisplayCtx);
    return (
        <div className="ci-main-wrapper">
            <div className="ci-profile-wrapper">
                <div className="ci-username-wrapper">
                    <h4>{currentChat.chatType} chat</h4>
                </div>
                <div className="ci-profile-pic">
                    <div className="ci-profile-pic-holder">
                        <img src={currentChat.chatType == "Private" ? (currentChat.altpic ? currentChat.altpic : avatarOutline) : (currentChat.chatpic ? currentChat.chatpic : avatarOutline)} alt="@" />
                    </div>
                </div>
            </div>
            <div className="ci-details">
                <h4 style={{
                    color: "white",
                    padding: "10px",
                    textAlign: "center",
                    fontWeight: "300"
                }}>Participants</h4>
                <div className="participants-wrapper">
                    {
                        currentChat.participants.map((pat)=>{
                            return (
                                <Participant key={currentChat.participants.indexOf(pat)*2} username={pat.username} uid={pat.uid} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ChatInfo;