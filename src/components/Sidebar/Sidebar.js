import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import axios from "../../axios";

//redux
import { useSelector, useDispatch } from "react-redux";
import { singleChatActions } from "../../store/single-chat";

// material Ui
import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import GroupIcon from "@material-ui/icons/Group";
import PersonIcon from "@material-ui/icons/Person";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
//drawer

// Components
import FriendList from "./SubComponents/FriendList";
import Search from "./Search/Search";
import GroupForm from "../Group/GroupForm";
import GroupBar from "../Group/GroupBar";
import TemporaryDrawer from "../UI/Drawer";
import { green } from "@material-ui/core/colors";

function Sidebar(props) {
  const user = useSelector((state) => state.auth.user);

  const friendsSelect = useSelector((state) => state.singleChat.friends);

  const dispatch = useDispatch();

  const [showGroup, setShowGroup] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [groupForm, setGroupForm] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const [loadingFriends, setLoadingFriends] = useState(false);

  const setMenuHandler = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const setSearchHandler = () => {
    setShowGroup(false);
    setShowSearch(true);
  };

  const setGroupHandler = () => {
    setShowSearch(false);
    setShowGroup(!showGroup);
  };

  const showGroupFormHandler = () => {
    if (!groupForm) {
      setAnchorEl(null);
    }
    setGroupForm(!groupForm);
  };

  /**
   * When new friend this function will trigger
   * Update the friend list
   * remove group chat and serach list and show chat list
   */
  const onAddFriend = () => {
    getFriends();
    setShowGroup(false);
    setShowSearch(false);
  };

  const getFriends = async () => {
    setLoadingFriends(true);
    try {
      const res = await axios.get("/chat/get-friends", {
        withCredentials: true,
        headers: {
          authorization: sessionStorage.getItem("token"),
        },
        params: {
          id: user.id,
        },
      });

      const data = await res.data;

      // check for validation or any other errors
      if (!res.status === 200) {
        throw new Error(res.error);
      }

      dispatch(singleChatActions.setFriends(data));
    } catch (err) {
      console.log(err);
    }
    setLoadingFriends(false);
  };

  useEffect(() => {
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
        {loadingFriends && (
          <CircularProgress
            style={{
              color: "#02bfa3",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "auto",
              padding: "40px",
            }}
          />
        )}
        {friendsSelect.length <= 0 && (
          <Typography
            style={{
              color: "#02bfa3",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "auto",
              padding: "40px",
            }}
            variant="h5"
            component="h2"
          >
            Search friends by clicking on <ChatIcon></ChatIcon>{" "}
          </Typography>
        )}
        {friendsSelect.map((friend) => {
          return (
            <FriendList
              key={friend._id}
              friendId={
                user.name === friend.recevier.name
                  ? friend.sender._id
                  : friend.recevier._id
              }
              name={
                user.name === friend.recevier.name
                  ? friend.sender.name
                  : friend.recevier.name
              }
              chats={friend.chats}
              avatar={
                user.name === friend.recevier.name
                  ? friend.sender.avatar
                  : friend.recevier.avatar
              }
              room={friend.room}
              logined={
                user.name === friend.recevier.name
                  ? friend.sender.logined
                  : friend.recevier.logined
              }
              online={
                user.name === friend.recevier.name
                  ? friend.sender.lastOnline
                  : friend.recevier.lastOnline
              }
            ></FriendList>
          );
        })}
      </div>
    </React.Fragment>
  );

  return (
    <div className="sidebar">
      {/* sidebar header */}
      <div className="sidebar__header">
        <Avatar
          src={`${process.env.REACT_APP_URL}${user.avatar}`}
          style={{ width: "50px", height: "50px" }}
        ></Avatar>
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
            <MenuItem
              onClick={() => {
                setDrawer(true);
              }}
            >
              Profile
            </MenuItem>
            <MenuItem onClick={showGroupFormHandler}>New Group</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </div>
      </div>

      <TemporaryDrawer setDrawer={drawer}></TemporaryDrawer>

      {!showSearch && !showGroup && chatList}
      {showGroup && <GroupBar></GroupBar>}
      {showSearch && <Search id={user.id} setGetFriends={onAddFriend}></Search>}

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
