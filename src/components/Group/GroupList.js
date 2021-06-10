import React from "react";
import { useDispatch } from "react-redux";
import { groupActions } from "../../store/group";
import { authActions } from "../../store/auth";
// Matrial Ui
import { Avatar } from "@material-ui/core";

function GroupList(props) {
  const dispatch = useDispatch();

  const getGroupChatPage = () => {
    dispatch(
      groupActions.setCurrentSelectedGroup({
        group: props.room,
        groupId: props.groupId,
      })
    );
    dispatch(authActions.setSingleChat(false));
    dispatch(groupActions.setGroupChat(true));
  };

  return (
    <div className="sidebarChat" onClick={getGroupChatPage}>
      <Avatar className="sidebarChat__avatar"></Avatar>
      <div className="sidebarChat__info">
        <h2>{props.room}</h2>
      </div>
    </div>
  );
}

export default GroupList;
