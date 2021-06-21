import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import classes from "./Drawer.module.css";
import { updateName, updateAvatar } from "../../store/auth";

//dropzone
import { DropzoneDialog } from "material-ui-dropzone";

//Ui
import { Avatar, IconButton } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import EditIcon from "@material-ui/icons/Edit";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import CheckIcon from "@material-ui/icons/Check";
import Tooltip from "@material-ui/core/Tooltip";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles({
  list: {
    width: 450,
  },
});

function TemporaryDrawer({ drawer }) {
  const drawerClass = useStyles();
  const [state, setState] = React.useState(false);
  const user = useSelector((state) => state.auth.user);
  const [nameEdit, setNameEdit] = useState(false);

  //menu
  const [anchorEl, setAnchorEl] = React.useState(null);

  //dropzone
  const [open, setOpen] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const uploadAvatarHandler = (files) => {
    dispatch(
      updateAvatar({
        files: files,
        id: user.id,
      })
    );
    setOpen(false);
  };

  //name edit
  const nameRef = useRef("naba");
  const dispatch = useDispatch();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  /**
   * dispatch action to edit user name
   * @param {*} e
   */
  const nameSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateName({
        name: nameRef.current.value,
        id: user.id,
      })
    );
    setNameEdit(false);
  };

  const list = () => (
    <div className={drawerClass.list} role="presentation">
      <div className={classes.header}>
        <IconButton onClick={toggleDrawer(false)}>
          <KeyboardBackspaceIcon
            style={{ fontSize: 40, color: "white" }}
          ></KeyboardBackspaceIcon>
        </IconButton>
        <h3>Profile</h3>
      </div>
      <div className={classes.avatar}>
        <Tooltip title="Edit">
          <Avatar
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            src={`${process.env.REACT_APP_URL}${user.avatar}`}
            style={{
              height: "200px",
              width: "200px",
              cursor: "pointer",
            }}
          ></Avatar>
        </Tooltip>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <Button onClick={() => setOpen(true)}>Upload Image</Button>
          </MenuItem>
          <MenuItem onClick={handleClose}>Remove Photo</MenuItem>
          <MenuItem onClick={handleClose}>View photo</MenuItem>
        </Menu>
      </div>
      <DropzoneDialog
        acceptedFiles={["image/*"]}
        cancelButtonText={"cancel"}
        submitButtonText={"submit"}
        dialogTitle="Upload New Avatar"
        maxFileSize={5000000}
        open={open}
        onClose={() => setOpen(false)}
        onSave={(files) => {
          uploadAvatarHandler(files);
        }}
        showPreviews={false}
        showPreviewsInDropzone={true}
        showFileNamesInPreview={true}
      />
      <div className={classes.body}>
        <Typography
          variant="subtitle2"
          style={{ color: "#02bfa3", display: "block" }}
          gutterBottom
        >
          Your name
        </Typography>

        <Box display="flex">
          {!nameEdit && (
            <React.Fragment>
              <Typography
                variant="subtitle1"
                style={{ color: "#555d60", width: "80%" }}
              >
                {user.name}
              </Typography>
              <IconButton
                onClick={() => {
                  setNameEdit(true);
                }}
              >
                <EditIcon></EditIcon>
              </IconButton>
            </React.Fragment>
          )}

          {nameEdit && (
            <form>
              <TextField
                inputRef={nameRef}
                type="text"
                defaultValue={user.name}
              ></TextField>
              <IconButton onClick={nameSubmitHandler}>
                <CheckIcon></CheckIcon>
              </IconButton>
            </form>
          )}
        </Box>
      </div>
      <Divider></Divider>
      <div className={classes.body}>
        <Typography
          variant="subtitle2"
          style={{ color: "#02bfa3", display: "block" }}
          gutterBottom
        >
          About
        </Typography>
        <Box display="flex">
          <Typography
            variant="subtitle1"
            style={{ color: "#555d60", width: "80%" }}
          >
            {user.name}
          </Typography>

          <IconButton>
            <EditIcon></EditIcon>
          </IconButton>
        </Box>
      </div>
    </div>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Profile {drawer}</Button>
      <Drawer anchor="left" open={state} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
}

export default TemporaryDrawer;
