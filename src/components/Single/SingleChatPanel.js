import React, { useState, useEffect } from "react";
import axios from "../../axios";
import socket from "../../socket/socket";
import ScrollableFeed from "react-scrollable-feed";
import Picker from "emoji-picker-react";

//redux
import { useSelector, useDispatch } from "react-redux";
import { singleChatActions } from "../../store/single-chat";

//Ui
import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";

//component
import SingleChatList from "./SingleChatList";

function SingleChatPanel(props) {
  //states
  const dispatch = useDispatch();

  //emoji state
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [showEmoji, setShowEmoji] = useState(false);

  const currentFriend = useSelector(
    (state) => state.singleChat.currentSelectedFriend
  );

  const [message, setMessage] = useState("");

  //set message
  const messageHanlder = (e) => {
    setMessage(e.target.value);
  };

  //emoji
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  //since useState doestnot update the chosend emoji state ,
  //i used useEffect to see if the state of emoji changes, then set the message state to the chosen emoji
  useEffect(() => {
    if (chosenEmoji) {
      setMessage(chosenEmoji.emoji);
    }
  }, [chosenEmoji]);

  //emoji state
  const showEmojiHandler = () => {
    setShowEmoji(!showEmoji);
  };

  /**
   * get the updated chats of user and friend from the database
   * dipatch auth action to store the chats of user and friend in state
   */
  const getChats = async () => {
    try {
      const res = await axios.get("/chat/get-chats", {
        withCredentials: true,
        headers: {
          authorization: sessionStorage.getItem("token"),
        },
        params: {
          room: currentFriend.room,
        },
      });

      dispatch(singleChatActions.setCurrentFriendChats(res.data.chats));
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
    getChats();
  }, [currentFriend]);

  /**
   * on change of selected friend emit the new room to socket for joining the room
   */
  useEffect(() => {
    socket.emit("room", currentFriend.room);
  }, [currentFriend.room]);

  /**
   * emit a socket event with room name to server
   * call storechat api to store the sended chat message
   * clean the message box
   * @param {*} e
   */
  const sendMessage = (e) => {
    e.preventDefault();

    socket.emit("chat", {
      room: currentFriend.room,
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
      const res = await axios.post(
        "/chat/store-chat",
        {
          sender: props.name,
          message: message,
          room: currentFriend.room,
        },
        {
          headers: {
            authorization: sessionStorage.getItem("token"),
          },
        }
      );

      console.log(res);
      getChats();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <React.Fragment>
      <div className="chatPanel__header">
        <Avatar src="https://yt3.ggpht.com/ytc/AAUvwngw35YY8vYI86RTOoEGafSxEjghjzTcKw3LbMyZ=s900-c-k-c0x00ffffff-no-rj"></Avatar>
        <div className="chatPanel__headerInfo">
          <h3>{currentFriend.friend}</h3>
          {currentFriend.logined ? (
            <p>online</p>
          ) : (
            <p>
              Last Online :{" "}
              {new Date(currentFriend.online).toLocaleTimeString()}
            </p>
          )}
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

      <SingleChatList
        getChatHandler={getChats}
        friend={currentFriend.friend}
      ></SingleChatList>

      <div className="chatPanel__send">
        <IconButton onClick={showEmojiHandler}>
          <InsertEmoticonIcon></InsertEmoticonIcon>
        </IconButton>

        {showEmoji && (
          <Picker
            onEmojiClick={onEmojiClick}
            disableSkinTonePicker
            disableSearchBar
            groupVisibility={{
              flags: false,
            }}
            pickerStyle={{ width: "40%", top: "-310%" }}
          />
        )}

        <form>
          <input
            type="text"
            value={message}
            onChange={messageHanlder}
            placeholder="Type Here"
          ></input>
          <button type="submit" onClick={sendMessage}>
            Send
          </button>
        </form>
        <IconButton>
          <MicIcon></MicIcon>
        </IconButton>
      </div>
    </React.Fragment>
  );
}

export default SingleChatPanel;
