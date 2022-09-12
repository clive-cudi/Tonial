import React from "react";
import faker from "faker";
import axios from "axios";
import genUID from "../LoggedOutStack.js/firebase/UserIDgenerator";

function Feed() {
  const urlHeader = `http://localhost:4767`;

  function createDummy() {
    let username = faker.name.firstName();
    let connectionUser = faker.name.firstName();
    const dummyUser = {
      username: username,
      email: faker.internet.email(),
      uid: genUID(username),
      connections: [
        {
          user: connectionUser,
          uid: genUID(connectionUser),
        },
      ],
      conversations: [
        {
          uid: genUID(faker.name.firstName()),
          chatId: genUID("chat"),
        },
      ],
    };
    const dummyChat = {
      chatid: "25teyqgjsuodrel2iHfg",
      chattype: "Private",
      participants: [
        {
          uid: genUID(username),
          username: username,
        },
      ],
      thread: [
        {
          type: "Sent",
          text: "Hi",
          time: "11:10 AM",
          date: "Oct 25, 2021",
        },
        {
          type: "Sent",
          text: "Hi too",
          time: "11:10 AM",
          date: "Oct 10, 2022",
        },
      ],
    };
    console.log(dummyChat);
    axios
      .post(`${urlHeader}/chats/addchat`, dummyChat)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div className="chats-main-wrapper">
      <h1>Feeds Page</h1>
      <button
        onClick={() => {
          createDummy();
        }}
      >
        Add Dummy Chat
      </button>
    </div>
  );
}

export default Feed;
