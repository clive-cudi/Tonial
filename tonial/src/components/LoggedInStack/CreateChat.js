import React from "react";
import "./stylesheets/crchat.css";
import Search from "./Search";
import {BiArrowBack} from 'react-icons/bi';
import { ModalCtx } from "../contexts/ModalCtx";
import { useContext } from "react";
import axios from "axios";
import { LoggedInCtx } from "../contexts/LoggedInCtx";
import { useEffect } from "react";
import ChatWidget from "./ChatWidget";
import { useState } from "react";
import { ChatInits } from "../contexts/ChatInits";

function CreateChat() {
    const [openModal, setOpenModal] = useContext(ModalCtx);
    const [userName] = useContext(LoggedInCtx);
    // from the server
    const [userConnects, setUserConnects] = useState([]);
    // from the context
    const [initializedChats, setInitializedChats] = useContext(ChatInits);


    useEffect(()=>{
      // filter initialized chats from the conversations received and set up initially in the context
      axios.get(`http://localhost:4767/user/getconnects?uid=${userName.uid}`).then((res)=>{
        console.log(res.data);
        setUserConnects(res.data ?? []);
        // append a new chat widget to the chat widgets array
      }).catch((e)=>{
        console.log(e)
      })
    },[]);

  return (
    <div className="crchat-main-wrapper">
      <div className="crchat-title">
          <button onClick={()=>{
              setOpenModal({
                  openStatus: false,
              })
          }}>
              <BiArrowBack />
          </button>
        <h4>Create New Chat</h4>
      </div>
      <Search />
      <div className="crchat-results-wrapper">
          {/* useeffect --> req to server for connections --> if connections > 10 display the first 10 then others are filtered off when typing */}
          {/*                 key={random_int}
                username={user_chat_widget_label}
                status={false}
                image={faker.image.avatar()}
                chatData={chat} */}
          {
            userConnects?.map((connect, index)=>{
              return (
                <ChatWidget key={index} username={connect.username} status={true} image={null} chatData={{username: connect.username, uid: connect.uid}} actionNature="addchat" relativeUid={connect.uid} type={"Private"} />
              )
            })
          }
      </div>
    </div>
  );
}

export default CreateChat;
