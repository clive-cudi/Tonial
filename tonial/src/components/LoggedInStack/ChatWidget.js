import React from "react";
import "./stylesheets/chatwidget.css";
import ProfileStatus from "./ProfileStatus";
import { useContext } from "react";
import { ChatDisplayCtx } from "../contexts/ChatDisplayCtx";
import socketClient from "socket.io-client";
import { MdAudiotrack } from "react-icons/md";
import { LoggedInCtx } from "../contexts/LoggedInCtx";
import axios from "axios";
import { ModalCtx } from "../contexts/ModalCtx";
import { ChatIndex } from "../contexts/ChatIndex";
import {useState, useEffect} from 'react';
import avatarOutline from '../assets/avatar_outline.png';
import Store from './redux/Store';

function ChatWidget({ username, status, unreadMessages, chatData, actionNature, index, relativeUid, type, id }) {
  const [currentChat, setCurrentChat] = useContext(ChatDisplayCtx);
  const [loggedInData] = useContext(LoggedInCtx);
  const [openModal, setOpenModal] = useContext(ModalCtx);
  const [currentChatIndex, setCurrentChatIndex] = useContext(ChatIndex);
  const [image, setImage] = useState(avatarOutline);

  function createChatHandler(){
    // get the sender uid from context
    // get the receipient uid from the chat data this.props.chatData
    // do an axios post request for /addchat to add a chat to db
    // dependencies for post req {chatId, type, thread, participants}
    let currentUid = localStorage.getItem("uid");
    // add chat dependencies / template

    /*    
      let addChatDep = {
        type: 'Private' || 'Group',
        thread: <Array>,
        participants: <Array> [
          {
            username: <String> localStorage.getItem('tonialUser'),
            uid: <String> currentUid
          },
          {
            username: <String> chatData.username,
            uid: <String> chatData.uid
          }
        ]
      }
     */

    let addChatDep = {
      type: 'Private',
      thread: [],
      participants: [
        {
          username: localStorage.getItem('tonialUser'),
          uid: currentUid
        },
        {
          username: chatData.username,
          uid: chatData.uid
        }
      ]
    }
    axios.post(`http://localhost:4767/chats/addchat`, addChatDep).then((res)=>{
      // close the modal
      // open the chat in the chat area
      // the server returns the generated chatId
      // {
      //   _id: "617f4d9d6b93515bdb655111",
      //   chatId: "bI#580chatI271btonial#12730",
      //   chatType: null,
      //   participants: [],
      //   thread: [],
      //   createdAt: "2021-11-01T02:14:53.635Z",
      //   updatedAt: "2021-11-01T02:14:53.635Z",
      //   __v: 0,
      // }
      let resChatId = res.data.newChatId;
      console.log(resChatId);
      // if there is a chatId
      axios.get('http://localhost:4767/chats/getchat/?chatid='+ resChatId).then((chatObjRes)=>{
        console.log(`ChatObjRes: \n`+chatObjRes)
        // add the chat to the chatlist -> [...ReduxChats<Array>, chatObjRes.data]
        setCurrentChat(chatObjRes.data);
        Store.dispatch({
          type: 'ADD_NEW_CHAT',
          payload: chatObjRes.data
        })
        setOpenModal(false);
      }).catch((e)=>{
        console.log('Error at GET request to getchat')
        console.log(e)
      })
    }).catch((e)=>{
      console.log('Error at post request to addchat')
      console.log(e)
    })
  }

  useEffect(()=>{
    if (type == "Private") {
      axios.get(`http://localhost:4767/user/getprofilepic?uid=${relativeUid}`).then((res)=>{
        if (res.data.result !== null) {
          setImage(res.data.result)
        }
      })
    } else if (type == "Group") {
      axios.get(`http://localhost:4767/chats/getchatpic?chatid=${id}`).then((res)=>{
        if (res.data.chatpic !== null) {
          setImage(res.data.chatpic);
        }
      })
    }
  },[])

  return (
    <div
      className="cw-wrapper"
      onClick={() => {
        if (actionNature == "addchat"){
          createChatHandler();
        } else {
          if (type == "Private"){
            setCurrentChat({...chatData, altpic: image});
          } else {
            setCurrentChat(chatData);
          }
          setCurrentChatIndex(index)
          console.log(`CI: ${currentChatIndex}`)
        }
      }}
    >
      <div className="cw-content">
        <div className="cw-profile">
          <ProfileStatus status={status} image={image} />
          <h3>{username}</h3>
        </div>
        <div className="cw-info">
          {/* //audio track icon to be shown if user is has a chat track playing */}
          <MdAudiotrack color="chartreuse" />
          <span>{unreadMessages}</span>
        </div>
      </div>
    </div>
  );
}

export default ChatWidget;
