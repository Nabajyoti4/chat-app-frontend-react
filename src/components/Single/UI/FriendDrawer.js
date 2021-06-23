import React, { useRef, useState } from "react";
//Ui
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, IconButton } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import BlockIcon from "@material-ui/icons/Block";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import Drawer from "@material-ui/core/Drawer";

//redux
import { useSelector, useDispatch } from "react-redux";
import { singleChatActions } from "../../../store/single-chat";

const useStyles = makeStyles({
  list: {
    width: 450,
  },
  boxCommand: {
    backgroundColor: "white",
    padding: "30px",
    display: "flex",
    color: "red",
    cursor: "pointer",
  },
});

function FriendDrawer() {
  const drawerClass = useStyles();
  const drawerShow = useSelector((state) => state.singleChat.drawer);

  const friend = useSelector((state) => state.singleChat.currentSelectedFriend);
  const status = useSelector((state) => state.singleChat.currentFriendStatus);
  const online = useSelector((state) => state.singleChat.currentFriendOnline);

  const dispatch = useDispatch();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    dispatch(singleChatActions.setShowDrawer(open));
  };

  const list = () => (
    <div className={drawerClass.list} role="presentation">
      <Box
        style={{
          backgroundColor: "#e6e1db",
        }}
      >
        <Box
          style={{
            backgroundColor: "#e6e3dd",
            display: "flex",
          }}
        >
          <IconButton
            onClick={() => {
              dispatch(singleChatActions.setShowDrawer(false));
            }}
          >
            <CloseIcon></CloseIcon>
          </IconButton>
          <Typography
            variant="body1"
            style={{
              padding: "15px",
            }}
          >
            Contact Info
          </Typography>
        </Box>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <Avatar
            aria-controls="simple-menu"
            aria-haspopup="true"
            src={`${process.env.REACT_APP_URL}${friend.avatar}`}
            style={{
              height: "200px",
              width: "200px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          ></Avatar>
        </Box>
        <Box
          p={2}
          style={{
            backgroundColor: "white",
          }}
        >
          <Typography
            variant="h5"
            style={{
              padding: "5px",
              backgroundColor: "white",
            }}
          >
            {friend.name}
          </Typography>
          <Typography
            variant="body2"
            style={{
              padding: "5px",
              color: "#bdbdbc",
            }}
          >
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
          </Typography>
        </Box>
        <Box
          mt={1}
          style={{
            backgroundColor: "white",
            padding: "10px",
          }}
        >
          <Typography
            variant="body2"
            style={{
              padding: "5px",
              color: "#02bfa3",
              marginLeft: "15px",
            }}
          >
            Media , Links and Docs
          </Typography>
        </Box>
        <Box
          mt={1}
          style={{
            backgroundColor: "white",
            padding: "10px",
          }}
        >
          <Typography
            variant="body2"
            style={{
              padding: "5px",
              color: "#02bfa3",
              marginLeft: "15px",
            }}
          >
            About and phone number
          </Typography>

          <Typography
            variant="h6"
            style={{
              padding: "5px",
              marginLeft: "15px",
            }}
          >
            About description of the friend
          </Typography>
          <Divider></Divider>
          <Typography
            variant="h6"
            style={{
              padding: "5px",
              marginLeft: "15px",
            }}
          >
            +91 {friend.phone}
          </Typography>
        </Box>
        <Box
          mt={1}
          style={{
            backgroundColor: "white",
            padding: "10px",
          }}
        >
          <Typography
            variant="body2"
            style={{
              padding: "5px",
              color: "#02bfa3",
              marginLeft: "15px",
            }}
          >
            Groups in common
          </Typography>
        </Box>
        <Box mt={1} className={drawerClass.boxCommand}>
          <BlockIcon></BlockIcon>
          <Typography
            variant="h6"
            style={{
              marginLeft: "30px",
            }}
          >
            Block
          </Typography>
        </Box>
        <Box mt={1} className={drawerClass.boxCommand}>
          <ThumbDownIcon></ThumbDownIcon>
          <Typography
            variant="h6"
            style={{
              marginLeft: "30px",
            }}
          >
            Report Contact
          </Typography>
        </Box>
        <Box mt={1} className={drawerClass.boxCommand}>
          <DeleteIcon></DeleteIcon>
          <Typography
            variant="h6"
            style={{
              marginLeft: "30px",
            }}
          >
            Delete Chats
          </Typography>
        </Box>
      </Box>
    </div>
  );

  return (
    <div>
      <Drawer anchor="right" open={drawerShow} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
}

export default FriendDrawer;
