import React from 'react';
import {AiOutlinePaperClip} from 'react-icons/ai';
import {GiPaperClip} from 'react-icons/gi';
import {AiOutlineSend} from 'react-icons/ai';
import {RiChatSmile2Line} from 'react-icons/ri';
import {HiOutlineMicrophone} from 'react-icons/hi';
import { useState } from 'react';
import axios from 'axios';
import { ChatDisplayCtx } from '../contexts/ChatDisplayCtx';
import { useContext } from 'react';
import socket from './Socketer';
import Store from './redux/Store';
import { useSelector } from 'react-redux';


function Sender() {
    const [text, setText] = useState('');
    const [currentChat] = useContext(ChatDisplayCtx);

    function handleSubmit(){
        // function to first send text object database then update the chat thread
        // post request to server with senderuid, text and time
        // handle empty texts
        const message = {
            senderuid: localStorage.getItem("uid"),
            chatId: currentChat.chatId,
            txt: text,
            time: new Date(Number(Date.now())).toString()
        }
        function connect(newMsg) {
            socket.emit("message", newMsg);
          }
        console.log(message);
        axios.post('http://localhost:4767/chats/updatechat',message).then((res)=>{         
            connect(res.data);
            Store.dispatch({
                type: 'UPDATE_CHAT',
                payload: {
                    chatId: res.data.chatId,
                    msg: res.data
                }
            })
            setText('');
        }).catch((e)=>{
            console.log(e);
        })

    }
    return (
        <div className="sender-main-wrapper">
            <div className="sender-input-div">
                {/* <AiOutlinePaperClip /> */}
                <button><GiPaperClip /></button>
                <input type="text" placeholder="Enter Message" onChange={(e)=>{
                    setText(e.target.value);
                }} value={text}  />
                <button><RiChatSmile2Line /></button>
                <button><HiOutlineMicrophone /></button>
                <button onClick={()=>{
                    handleSubmit();
                }}><AiOutlineSend /></button>
            </div>
        </div>
    )
}

export default Sender;