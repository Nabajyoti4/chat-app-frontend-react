import React, { useState } from "react";
import "./Search.css";
import axios from "../../../axios";

import SearchIcon from "@material-ui/icons/Search";
import SearchList from "./SearchList";

function Search(props) {
  const [searchUser, setSearchUser] = useState("");
  const [userList, setUserList] = useState([]);

  // set the searchUser state value to input value and send request to server on every change to get the user
  const setSearchHandler = (e) => {
    setSearchUser(e.target.value);
    getUser();
  };

  const getUser = async () => {
    try {
      const res = await axios.get("/chat/users", {
        withCredentials: true,

        params: {
          name: searchUser,
        },
        headers: {
          authorization: sessionStorage.getItem("token"),
        },
      });

      const data = await res.data;

      // check for validation or any other errors
      if (!res.status === 200) {
        throw new Error(res.error);
      }

      setUserList(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchIcon></SearchIcon>
          <input
            value={searchUser}
            onChange={setSearchHandler}
            type="text"
            placeholder="Search New Users"
          ></input>
        </div>
      </div>

      <div className="sidebar_chats">
        {searchUser.length === 0 && (
          <p className="blank_search">Start Searching..</p>
        )}
        {searchUser.length !== 0 &&
          userList.map((user) => {
            return (
              <SearchList
                auth={props.id}
                key={user._id}
                id={user._id}
                name={user.name}
              ></SearchList>
            );
          })}
      </div>
    </React.Fragment>
  );
}

export default Search;
