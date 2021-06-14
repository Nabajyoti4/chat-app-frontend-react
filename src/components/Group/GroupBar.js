import React, { useEffect } from "react";
import axios from "../../axios";

import SearchIcon from "@material-ui/icons/Search";
import GroupList from "./GroupList";

import { useSelector, useDispatch } from "react-redux";
import { groupActions } from "../../store/group";

function GroupBar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const groups = useSelector((state) => state.group.groups);

  const getGroups = async () => {
    try {
      const res = await axios.get("/group/get-groups", {
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

      dispatch(groupActions.setGroups(data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <React.Fragment>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchIcon></SearchIcon>
          <input type="text" placeholder="Search users"></input>
        </div>
      </div>

      <div className="sidebar_chats">
        {groups.map((group) => (
          <GroupList
            key={group._id}
            groupId={group._id}
            room={group.room}
          ></GroupList>
        ))}
      </div>
    </React.Fragment>
  );
}

export default GroupBar;
