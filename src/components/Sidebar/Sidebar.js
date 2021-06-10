import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import axios from "axios";

//redux
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

// material Ui
import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import GroupIcon from "@material-ui/icons/Group";
import PersonIcon from "@material-ui/icons/Person";

// Components
import ChatList from "./SubComponents/ChatList";
import Search from "./Search/Search";
import GroupForm from "../Group/GroupForm";
import GroupBar from "../Group/GroupBar";

function Sidebar(props) {
  const user = useSelector((state) => state.auth.user);
  const friendsSelect = useSelector((state) => state.auth.friends);
  const dispatch = useDispatch();

  const [showGroup, setShowGroup] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [groupForm, setGroupForm] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const setMenuHandler = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const setSearchHandler = () => {
    setShowSearch(!showSearch);
  };

  const setGroupHandler = () => {
    setShowGroup(!showGroup);
  };

  const showGroupFormHandler = () => {
    if (!groupForm) {
      setAnchorEl(null);
    }
    setGroupForm(!groupForm);
  };

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get("http://localhost:3002/chat/get-friends", {
          withCredentials: true,
          params: {
            id: user.id,
          },
        });

        const data = await res.data;

        // check for validation or any other errors
        if (!res.status === 200) {
          throw new Error(res.error);
        }

        dispatch(authActions.setFriends(data));
      } catch (err) {
        console.log(err);
      }
    };

    getFriends();
  }, [user, dispatch]);

  const chatList = (
    <React.Fragment>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchIcon></SearchIcon>
          <input type="text" placeholder="Search users"></input>
        </div>
      </div>

      <div className="sidebar_chats">
        {friendsSelect.map((friend) => {
          return (
            <ChatList
              key={friend._id}
              friendId={friend._id}
              name={
                user.name === friend.recevier.name
                  ? friend.sender.name
                  : friend.recevier.name
              }
              chats={friend.chats}
              avatar={friend.recevier.avatar}
              room={friend.room}
            ></ChatList>
          );
        })}
      </div>
    </React.Fragment>
  );

  return (
    <div className="sidebar">
      {/* sidebar header */}
      <div className="sidebar__header">
        <Avatar src={`/profile/${user.avatar}`}></Avatar>
        <div className="chatPanel__headerInfo">
          <h3>{user.name}</h3>
        </div>

        <div className="sidebar__headerRight">
          <IconButton onClick={setGroupHandler}>
            {!showGroup && <GroupIcon></GroupIcon>}
            {showGroup && <PersonIcon></PersonIcon>}
          </IconButton>
          <IconButton onClick={setSearchHandler}>
            <ChatIcon></ChatIcon>
          </IconButton>
          <IconButton onClick={setMenuHandler}>
            <MoreVertIcon></MoreVertIcon>
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={showGroupFormHandler}>New Group</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </div>
      </div>

      {!showSearch && !showGroup && chatList}
      {showGroup && <GroupBar></GroupBar>}
      {showSearch && <Search id={user.id}></Search>}

      {groupForm && (
        <GroupForm
          getMember={groupForm}
          modalShow={showGroupFormHandler}
        ></GroupForm>
      )}
    </div>
  );
}

export default Sidebar;
