import React from "react";
import "./ChatList.css";

//Redux
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/auth";
import { groupActions } from "../../../store/group";

// Matrial Ui
import { Avatar } from "@material-ui/core";

function ChatList(props) {
  const dispatch = useDispatch();

  const getChatPage = () => {
    dispatch(
      authActions.setCurrentSelectedFriend({
        friend: props.name,
        friendId: props.friendId,
        room: props.room,
        avatar: props.avatar,
      })
    );
    dispatch(groupActions.setGroupChat(false));
    dispatch(authActions.setSingleChat(true));
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
