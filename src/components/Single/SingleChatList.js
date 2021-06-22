import React from "react";
import socket from "../../socket/socket";
import ScrollableFeed from "react-scrollable-feed";
//redux
import { useSelector } from "react-redux";
//UI
import CircularProgress from "@material-ui/core/CircularProgress";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: 200,
    borderRadius: "10px",
    backgroundColor: "white",
    padding: "10px",
    marginTop: "10px",
  },
  rootReceiver: {
    width: 200,
    borderRadius: "10px",
    backgroundColor: "white",
    padding: "10px",
    marginTop: "10px",
    marginLeft: "auto",
  },
});
function SingleChatList(props) {
  const chats = useSelector((state) => state.singleChat.currentFriendChats);
  const classes = useStyles();
  socket.once("recevied", (text) => {
    console.log("socket recevive on");
    props.getChatHandler();
  });

  return (
    <ScrollableFeed className="chatPanel__body">
      {props.loading && (
        <React.Fragment>
          <CircularProgress
            style={{
              color: "#02bfa3",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "auto",
              background: "white",
              borderRadius: "50px",
              padding: "5px",
            }}
          />
          <div className={classes.root}>
            <Skeleton
              style={{
                backgroundColor: "gray",
              }}
            />
            <Skeleton animation={false} />
            <Skeleton animation="wave" />
          </div>
          <div className={classes.rootReceiver}>
            <Skeleton
              style={{
                backgroundColor: "gray",
              }}
            />
            <Skeleton animation={false} />
            <Skeleton animation="wave" />
          </div>
        </React.Fragment>
      )}
      {chats.map((chat) => (
        <p
          key={chat._id}
          className={`chatPanel__message ${
            chat.sender.name !== props.friend ? "chatPanel__recevier" : " "
          }
              `}
        >
          <span className="chatPanel__name">{chat.sender.name}</span>
          {chat.message}
          <span className="chatPanel__timestamp">
            {new Date().toUTCString()}
          </span>
        </p>
      ))}
    </ScrollableFeed>
  );
}

export default SingleChatList;
