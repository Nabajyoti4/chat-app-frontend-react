import React from "react";
import { useSelector } from "react-redux";
import socket from "../../../socket/socket";

function GroupChatList(props) {
  const chats = useSelector((state) => state.group.currentGroupChats);
  const user = useSelector((state) => state.auth.user);

  socket.once("recevied", (text) => {
    console.log("socket recevive on");
    props.getChatHandler();
  });

  return (
    <div>
      {chats.map((chat) => (
        <p
          key={chat._id}
          className={`chatPanel__message ${
            chat.sender === user.name ? "chatPanel__recevier" : " "
          }
              `}
        >
          <span className="chatPanel__name">{chat.sender}</span>
          {chat.message}
          <span className="chatPanel__timestamp">
            {new Date().toUTCString()}
          </span>
        </p>
      ))}
    </div>
  );
}

export default GroupChatList;
