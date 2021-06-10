import React from "react";
import socket from "../../socket/socket";

//redux
import { useSelector } from "react-redux";

function SingleChatList(props) {
  const chats = useSelector((state) => state.auth.currentFriendChats);

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
            chat.sender !== props.friend ? "chatPanel__recevier" : " "
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

export default SingleChatList;
