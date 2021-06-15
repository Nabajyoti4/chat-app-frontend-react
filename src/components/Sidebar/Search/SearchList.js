import React from "react";
import "./SearchList.css";
import axios from "../../../axios";

//UI
import Button from "@material-ui/core/Button";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

//notification
import { useDispatch } from "react-redux";
import { notificationActions } from "../../../store/notification";

function SearchList(props) {
  const { id, name } = props;
  const dispatch = useDispatch();

  const setCreateFriend = (e) => {
    e.preventDefault();
    addFriend();
  };

  const addFriend = async () => {
    try {
      const res = await axios.post(
        "/chat/add-friend",
        {
          sender: props.auth,
          recevier: id,
          room: `${props.auth}-${name}`,
        },
        {
          headers: {
            authorization: sessionStorage.getItem("token"),
          },
        }
      );

      dispatch(
        notificationActions.setNotification({
          type: "success",
          message: "Friend added",
        })
      );
    } catch (err) {
      dispatch(
        notificationActions.setNotification({
          type: "error",
          message: err.response.data.message,
        })
      );
    }
  };

  return (
    <div className="searchList">
      {/* <Avatar className="searchList__avatar" src={props.avatar}></Avatar> */}
      <div className="searchList__info">
        <h2>{name}</h2>
        <form action="post" className="searchList__form">
          <input type="hidden" name="recevier" value={id}></input>

          <Button
            endIcon={<PersonAddIcon></PersonAddIcon>}
            onClick={setCreateFriend}
            variant="contained"
            color="primary"
          >
            Add Friend
          </Button>
        </form>
      </div>
    </div>
  );
}

export default SearchList;
