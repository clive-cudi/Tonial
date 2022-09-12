import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import ProfileStatus from './ProfileStatus';
import faker from 'faker';
import {FcVideoCall, FcPhone, FcHeadset} from 'react-icons/fc';
import {AiOutlineEllipsis} from 'react-icons/ai';
import { useContext } from 'react';
import { LoggedInCtx } from '../contexts/LoggedInCtx';

function ChatHeader({chatParticipants, type, image}) {
    const [loggedInData, setLoggedInData] = useContext(LoggedInCtx);
    const [chatPal, setChatPal] = useState('');

    function avatarUser(){
        let avatar = faker.image.avatar();
        return avatar;
    }

    function findPal(){
        chatParticipants.map((pal)=>{
            if (pal.uid !== loggedInData.uid){
                setChatPal(pal.username)
            }
        })
    }

    useEffect(()=>{
        findPal();
    },[])

    return (
        <div className="chat-header-wrapper">
            <div className="ch-profile-wrapper">
                <ProfileStatus image={image} status={true} styling={{
                    height: "36px",
                    width: "36px",
                }} />
                <h5>{chatPal}</h5>
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

export default ChatHeader;