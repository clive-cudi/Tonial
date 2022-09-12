import React from 'react';
import ChatHeader from './ChatHeader';
import ChatThread from './ChatThread';
import Sender from './Sender';
import { LoggedInCtx } from '../contexts/LoggedInCtx';
import { useContext } from 'react';
import { ChatDisplayCtx } from '../contexts/ChatDisplayCtx';
import ChatHeaderGroup from './ChatHeaderGroup';
import { useState } from 'react';
import { useEffect } from 'react';
import socket from './Socketer';
import Store from './redux/Store';
import { useSelector } from 'react-redux';

function ChatsDisplay(thread) {
    const [loggedInData] = useContext(LoggedInCtx);
    const [currentChat, setCurrentChat] = useContext(ChatDisplayCtx);
    const [backUpthread, setBackupThread] = useState(currentChat.thread);
    const [prevId, setPrevId] = useState('');
    // let chat = currentChat;
    let currentChatThread = [];
    const chats = useSelector(state=> state)



      function updateThread(msg){
        setCurrentChat({...currentChat, thread: [
            ...currentChat.thread,
            msg
        ]});
        console.log(currentChat)
    }

    function socketListeners(){
        socket.on('groupmsg',(recMsg)=>{
            console.log("new group message")
            console.log(recMsg);
            // from the server 
            /* 
                {
                    chatId: "",
                    participants: [],
                    message: 
                }
            */

                // iterate through the chats and update the chat with matching chatID
            if (recMsg.chatId == currentChat.chatId){
                currentChatThread.push(recMsg);
                // console.log(currentChatThread);
                // updateThread(recMsg);
            }
            const foundChat = chats.find((chat)=> chat.chatId === recMsg.chatId);

            // incase of more than one chat available with the same chatId which is almost impossible then update the chat

            Store.dispatch({
                type: 'UPDATE_CHAT',
                payload: {
                    chatId: foundChat.chatId,
                    msg: recMsg
                }
            })


          });
        socket.on('privatemsg',(recMsg)=>{
            console.log("new private message");
            console.log(recMsg);
            console.log(currentChat.chatId)
            if (recMsg.chatId == currentChat.chatId){
                currentChatThread.push(recMsg);
                console.log(currentChatThread);
                // updateThread(recMsg);
            }
          })

    }

    useEffect(()=>{
        // Once the component loads the listeners are setup
        socketListeners();
    },[])
    

    return (
        <div className="cd-main-wrapper">
            {/* chatHeader */}
            {
                (currentChat.chatId && (currentChat.chatType == "Private" ? <ChatHeader chatParticipants={currentChat?.participants} image={currentChat.chatpic} /> : <ChatHeaderGroup participants={currentChat?.participants} image={currentChat.chatpic} />))
            }
            {/* chatThread */}
            <ChatThread thread={currentChat.thread} altPic={currentChat.chatType == "Private" ? currentChat.altpic : currentChat.chatpic} />
            {/* sender */}
            <Sender />
        </div>
    )
}

export default ChatsDisplay;