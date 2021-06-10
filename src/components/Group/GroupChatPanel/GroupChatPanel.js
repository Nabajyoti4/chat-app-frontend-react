import React, { useState, useEffect } from "react";
import socket from "../../../socket/socket";
import axios from "axios";
import ScrollableFeed from "react-scrollable-feed";

//redux
import { useSelector, useDispatch } from "react-redux";
import { groupActions } from "../../../store/group";

//Ui
import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import GroupChatList from "./GroupChatList";

function GroupChatPanel() {
  //states
  const dispatch = useDispatch();
  const group = useSelector((state) => state.group.currentSelectedGroup);
  const user = useSelector((state) => state.auth.user);
  const [message, setMessage] = useState("");

  //set message
  const messageHanlder = (e) => {
    setMessage(e.target.value);
  };

  /**
   * get the updated chats of user and friend from the database
   * dipatch auth action to store the chats of user and friend in state
   */
  const getGroupChats = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3002/group/get-group-chats",
        {
          withCredentials: true,
          params: {
            room: group.group,
          },
        }
      );

      dispatch(groupActions.setCurrentGroupChats(res.data.chats));
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * excute with change of currentfriend
   * call getchats api function to get the chats of the selected friend with auth user
   */
  useEffect(() => {
    console.log("set chats");
    getGroupChats();
  }, [group]);

  /**
   * on change of selected friend emit the new room to socket for joining the room
   */
  useEffect(() => {
    socket.emit("room", group.group);
  }, [group.group]);

  /**
   * emit a socket event with room name to server
   * call storechat api to store the sended chat message
   * clean the message box
   * @param {*} e
   */
  const sendMessage = (e) => {
    e.preventDefault();

    socket.emit("chat", {
      room: group.group,
    });

    storeChat();
    setMessage("");
  };

  /**
   * store sended  chat of user in database
   * if successfull call the getchats api to get the latest chats from database
   */
  const storeChat = async () => {
    try {
      const res = await axios({
        method: "post",
        url: "http://localhost:3002/group/store-group-chat",
        withCredentials: true,
        data: {
          sender: user.name,
          message: message,
          room: group.group,
        },
      });

      console.log(res);
      getGroupChats();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatPanel">
      <React.Fragment>
        <div className="chatPanel__header">
          <Avatar src="https://yt3.ggpht.com/ytc/AAUvwngw35YY8vYI86RTOoEGafSxEjghjzTcKw3LbMyZ=s900-c-k-c0x00ffffff-no-rj"></Avatar>
          <div className="chatPanel__headerInfo">
            <h2>{group.group}</h2>
          </div>

          <div className="chatPanel__headerIcons">
            <IconButton>
              <SearchIcon></SearchIcon>
            </IconButton>
            <IconButton>
              <MoreVertIcon></MoreVertIcon>
            </IconButton>
          </div>
        </div>

        <ScrollableFeed>
          <div className="chatPanel__body">
            <GroupChatList getChatHandler={getGroupChats}></GroupChatList>
          </div>
        </ScrollableFeed>
        <div className="chatPanel__send">
          <IconButton>
            <InsertEmoticonIcon></InsertEmoticonIcon>
          </IconButton>

          <form>
            <input
              type="text"
              value={message}
              onChange={messageHanlder}
              placeholder="Type Here"
            ></input>
            <button onClick={sendMessage} type="submit">
              Send
            </button>
          </form>
          <IconButton>
            <MicIcon></MicIcon>
          </IconButton>
        </div>
      </React.Fragment>
    </div>
  );
}

export default GroupChatPanel;
