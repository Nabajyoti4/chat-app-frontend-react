import React, { useState, useEffect } from "react";

import axios from "../../axios";
import socket from "../../socket/socket";

import Picker from "emoji-picker-react";

import ReactAudioPlayer from "react-audio-player";

//redux
import { useSelector, useDispatch } from "react-redux";
import { singleChatActions, fetchFriend } from "../../store/single-chat";

//Ui
import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import Skeleton from "@material-ui/lab/Skeleton";

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
  const user = useSelector((state) => state.auth.user);
  const room = useSelector((state) => state.singleChat.room.room);
  const status = useSelector((state) => state.singleChat.currentFriendStatus);
  const online = useSelector((state) => state.singleChat.currentFriendOnline);

  const [loading, setLoading] = useState(false);

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

  socket.once("logout", () => {
    console.log(" logout thunk");
    dispatch(fetchFriend(currentFriend._id));
  });

  socket.once("logined", () => {
    console.log("login thunk");
    dispatch(fetchFriend(currentFriend._id));
  });

  /**
   * get the updated chats of user and friend from the database
   * dipatch auth action to store the chats of user and friend in state
   */
  const getChats = async (sending) => {
    if (!sending) {
      setLoading(true);
      dispatch(singleChatActions.setCurrentFriendChats([]));
    }
    try {
      const res = await axios.get("/chat/get-chats", {
        withCredentials: true,
        headers: {
          authorization: sessionStorage.getItem("token"),
        },
        params: {
          room: room,
        },
      });

      dispatch(singleChatActions.setCurrentFriendChats(res.data.chats));
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
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
    socket.emit("room", room);
  }, [room]);

  /**
   * emit a socket event with room name to server
   * call storechat api to store the sended chat message
   * clean the message box
   * @param {*} e
   */
  const sendMessage = (e) => {
    e.preventDefault();

    socket.emit("chat", {
      room: room,
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
          sender: user.id,
          message: message,
          room: room,
        },
        {
          headers: {
            authorization: sessionStorage.getItem("token"),
          },
        }
      );

      console.log(res);
      getChats(true);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <React.Fragment>
      <div className="chatPanel__header">
        {loading && (
          <React.Fragment>
            <Skeleton
              animation="wave"
              variant="circle"
              width={40}
              height={40}
            />
            <div className="chatPanel__headerInfo">
              <Skeleton
                animation="wave"
                height={10}
                width="50%"
                style={{ marginBottom: 6 }}
              />
              <Skeleton animation="wave" height={10} width="30%" />
            </div>
          </React.Fragment>
        )}
        {!loading && (
          <React.Fragment>
            <Avatar src={`/profile/${currentFriend.avatar}`}></Avatar>
            <div className="chatPanel__headerInfo">
              <h3>{currentFriend.name}</h3>
              {status ? (
                <p>online</p>
              ) : (
                <p>
                  Last Online :{" "}
                  {new Date(online).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              )}
            </div>
          </React.Fragment>
        )}

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
        friend={currentFriend.name}
        loading={loading}
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

        <IconButton
          onClick={() => {
            <ReactAudioPlayer
              ref={(onPlay) => {
                this.rap = onPlay;
              }}
              src="noti.mp3"
              autoPlay
              controls
            />;
          }}
        >
          <MicIcon></MicIcon>
        </IconButton>
      </div>
    </React.Fragment>
  );
}

export default SingleChatPanel;
