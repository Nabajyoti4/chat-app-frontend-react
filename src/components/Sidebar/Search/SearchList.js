import React from "react";
import "./SearchList.css";
import axios from "../../../axios";

function SearchList(props) {
  const { id, name } = props;

  const setCreateFriend = (e) => {
    e.preventDefault();
    addFriend();
  };

  const addFriend = async () => {
    const res = await axios.post(
      "/chat/add-friend",
      {
        sender: props.auth,
        recevier: id,
        room: `${props.auth}-${name}`,
      },
      {
        withCredentials: true,
      }
    );

    console.log(res);
  };

  return (
    <div className="searchList">
      {/* <Avatar className="searchList__avatar" src={props.avatar}></Avatar> */}
      <div className="searchList__info">
        <h2>{name}</h2>
        <form action="post">
          <input type="hidden" name="recevier" value={id}></input>
          <button onClick={setCreateFriend} className="searchList__btn">
            Add Friend
          </button>
        </form>
      </div>
    </div>
  );
}

export default SearchList;
