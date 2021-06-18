import React from "react";
import "./ChatList.css";

//Redux
import { useDispatch } from "react-redux";
import { singleChatActions } from "../../../store/single-chat";
import { groupActions } from "../../../store/group";

// Matrial Ui
import { Avatar } from "@material-ui/core";

function ChatList(props) {
  const dispatch = useDispatch();

  const getChatPage = () => {
    dispatch(
      singleChatActions.setCurrentSelectedFriend({
        friend: props.name,
        friendId: props.friendId,
        room: props.room,
        avatar: props.avatar,
        logined: props.logined,
        online: props.online,
      })
    );
    dispatch(
      singleChatActions.setCurrentFriendStatus({
        logined: props.logined,
        lastOnline: props.online,
      })
    );
    dispatch(groupActions.setGroupChat(false));
    dispatch(singleChatActions.setSingleChat(true));
  };

  return (
    <div className="sidebarChat" onClick={getChatPage}>
      <Avatar
        className="sidebarChat__avatar"
        src={`/profile/${props.avatar}`}
      ></Avatar>
      <div className="sidebarChat__info">
        <h2>{props.name}</h2>
        <p>
          {props.chats.length > 0 && props.chats[props.chats.length - 1].sender}
          {" : "}
          {props.chats.length > 0 &&
            props.chats[props.chats.length - 1].message}
        </p>
      </div>
    </div>
  );
}

export default ChatList;
