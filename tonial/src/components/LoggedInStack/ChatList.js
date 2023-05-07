import React from "react";
import ProfileStatus from "./ProfileStatus";
import { useContext } from "react";
import { LoggedInCtx } from "../contexts/LoggedInCtx";
import { HiOutlineStatusOnline, HiStatusOffline } from "react-icons/hi";
import { useState } from "react";
import ReactTooltip from "react-tooltip";
import { AiOutlineSearch } from "react-icons/ai";
import ChatWidget from "./ChatWidget";
import faker from "faker";
import MediaPlayer from "./MediaPlayer";
import { MdOutlineTrackChanges } from "react-icons/md";
import axios from "axios";
import { useEffect } from "react";
import { RiChatNewLine } from "react-icons/ri";
import { ModalCtx } from "../contexts/ModalCtx";
import CreateChat from "./CreateChat";
import { ChatInits } from "../contexts/ChatInits";
import Store from "./redux/Store";
import { useSelector } from "react-redux";
import avatarOutline from '../assets/avatar_outline.png';
import { ThemeCtx } from "../contexts/ThemeCtx";

function ChatList() {
  const [userName, setUserName] = useContext(LoggedInCtx);
  const [status, setStatus] = useState(true);
  let conversations = null;
  const [chats, setChats] = useState([]);
  const uidBckUp = localStorage.getItem("uid");
  const [openModal, setOpenModal] = useContext(ModalCtx);
  const [darkTheme] = useContext(ThemeCtx);
  const [initializedChats, setInitializedChats] = useContext(ChatInits);
  const ReduxChats = useSelector(state=> state);

  // check the length of chatlist in session storage then do get req to server

  // if the component is loading for the first time set deserve_chatlist_fetch = true 

  // once the component loads, check the sessionStorage for deserve_chatlist_fetch: if deserve_chatlist_fetch is true then fetch chatlist data from the server
  // else, no server requests

  // When a new message is sent via the server, the server notifies the front_end: if the new message is from a previously messaged connect, then there
  // is no need for a chatlist fetch else deserve_chatlist_fetch is done and the chatlist with the new connect is added

  function fetchChatlistData(){
        // query db for conversations associated with the user;
        conversations = null;
        setChats([]);
        Store.dispatch({
          type: 'CLEAR_STORE'
        })
        setUserName({ uid: uidBckUp });
        console.log("Fetching chat list data")
        if (userName.uid.length > 1) {
          axios
            .get("http://localhost:4767/user/getconversations/?uid=" + userName.uid)
            .then((res) => {
              conversations = res.data.conversations;
              setInitializedChats(conversations);
              conversations.forEach((con) => {
                // send a request for the chat info
                axios
                  .get("http://localhost:4767/chats/getchat/?chatid=" + con.chatId)
                  .then((chatRes) => {
                    setChats((prevChats) => {
                      return [...prevChats, chatRes?.data];
                    });
                    Store.dispatch({
                      type: 'INITIALIZE_CHATS',
                      payload: chatRes.data
                    });
                    console.log('Store Init')
                  })
                  .catch((e) => {
                    console.log(
                      "Error at Second request to http://localhost:4767/chats/getchat"
                    );
                    console.log(e);
                  });
              });
            })
            .catch((e) => {
              console.log(
                "error at first request http://localhost:4767/user/getconversations"
              );
              console.log(e);
            });
        } else {
          setUserName({ uid: uidBckUp });
          if (userName.uid.length > 1) {
            console.log("User found at second backup Attempt");
          } else {
            setUserName({ uid: localStorage.getItem("uid") });
          }
          axios
            .get("http://localhost:4767/user/getconversations/?uid=" + uidBckUp)
            .then((res) => {
              conversations = res.data.conversations;
              conversations.forEach((con) => {
                // send a request for the chat info
                axios
                  .get("http://localhost:4767/chats/getchat/?chatid=" + con.chatId)
                  .then((chatRes) => {
                    setChats((prevChats) => {
                      return [...prevChats, chatRes.data];
                    });
                    Store.dispatch({
                      type: 'INITIALIZE_CHATS',
                      payload: chatRes.data
                    })
                  })
                  .catch((e) => {
                    console.log(
                      "Error at Second backup request to http://localhost:4767/chats/getchat"
                    );
                    console.log(e);
                  });
              });
            })
            .catch((e) => {
              console.log(
                "error at first backup request http://localhost:4767/user/getconversations"
              );
              console.log(e);
            });
        }
  }

  useEffect(() => {
    // if deserve_chatlist_fetch is not set then set it and set the value to true
    if (sessionStorage.getItem('deserve_chatlist_fetch') === null || !sessionStorage["deserve_chatlist_fetch"]) {
      // first time the component is loading
      sessionStorage.setItem('deserve_chatlist_fetch', true)
      fetchChatlistData();
      sessionStorage.setItem('deserve_chatlist_fetch', false)
    }
  }, []);

  return (
    <div className="cl-main-wrapper">
      <div className="cl-header-wrapper">
        <div className="cl-header" style={{
                  background: !darkTheme && "rgb(248, 248, 248)",
                  border: !darkTheme && "0.2px solid rgba(175, 175, 175, 0.781)",
        }}>
          <div className="cl-header-profile" style={{
            color: darkTheme ? "white" : "black"
          }}>
            <ProfileStatus status={status} image={localStorage.getItem('avatar') == "null" ? avatarOutline : localStorage.getItem('avatar')} />
            <h3 style={{
            color: darkTheme ? "white" : "black"
          }}>{userName.userName ? userName.userName : localStorage.getItem('tonialUser')}</h3>
          </div>
          <div className="cl-header-controls">
            <ReactTooltip place="top" type="dark" effect="float" />
            <p
              data-tip="Your Chat Track"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MdOutlineTrackChanges color="white" />
            </p>
            <ReactTooltip place="top" type="dark" effect="float" />
            <p
              data-tip="Add Chat"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={()=>{
                setOpenModal({
                  openStatus: true,
                  data: <CreateChat />
                })
              }}
            >
              <RiChatNewLine color="white" />
            </p>
            <ReactTooltip place="top" type="dark" effect="float" />
            <p data-tip={status === true ? `Go Offline` : `Go Online`}>
              {status === true ? (
                <HiOutlineStatusOnline
                  style={{
                    color: "chartreuse",
                    margin: "10px",
                    fontSize: "18px",
                  }}
                  onClick={() => {
                    setStatus(false);
                  }}
                />
              ) : (
                <HiStatusOffline
                  style={{
                    color: "crimson",
                    margin: "10px",
                    fontSize: "18px",
                  }}
                  onClick={() => {
                    setStatus(true);
                  }}
                />
              )}
            </p>
          </div>
        </div>
        <div className="cl-search-wrapper">
          <div className="cl-search">
            <AiOutlineSearch />
            <input type="text" placeholder="Search" />
          </div>
        </div>
      </div>
      <div className="cl-list-wrapper">
        {/* {
          array.map((num)=>{
            let random_int = (Math.random()*array.length*2).toFixed(5)
            return(
            <ChatWidget key={random_int} username={faker.name.firstName()} status={true} unreadMessages="2" image={faker.image.avatar()} />
            )
          })
        } */}
        {/* mapping only happens if a chat is available or ReduxChats[0] === true */}
        {ReduxChats[0] && ReduxChats?.map((chat, index) => {
          let random_int = (Math.random() * chats.length * 2).toFixed(5);
          if (chat?.chatType == "Private") {
            let user_chat_widget_label = "";
            let alt_uid = ""
            chat?.participants.forEach((user, index) => {
              if (user.uid !== userName.uid) {
                user_chat_widget_label = user.username;
                alt_uid = user.uid;
              }
            });
            return (
              <ChatWidget
                key={random_int}
                username={user_chat_widget_label}
                status={false}
                image={faker.image.avatar()}
                chatData={chat}
                relativeUid = {alt_uid}
                type= {"Private"}
                index = {index}
              />
            );
          } else if (chat?.chatType == "Group") {
            // onclick function that triggers a chat? area ui for group layout
            return (
              <ChatWidget
                key={random_int}
                username={`${chat?.participants[0].username}, ${chat?.participants[1].username}...`}
                status={true}
                id={chat.chatId}
                chatData={chat}
                index= {index}
                type={"Group"}
              />
            );
          }
        })}
      </div>
      <MediaPlayer />
    </div>
  );
}

export default ChatList;
