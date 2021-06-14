import React, { useState, useEffect } from "react";
import Modal from "../../components/UI/Modal";
import axios from "../../axios";
import "./GroupForm.css";
import MultiSelect from "react-multi-select-component";
import { useSelector } from "react-redux";

function GroupForm(props) {
  const user = useSelector((state) => state.auth.user);
  const [name, setName] = useState("");

  const [friends, setFriends] = useState([]);

  const [selectedFriends, setSelectedFriends] = useState([]);

  const setNameHandler = (e) => {
    setName(e.target.value);
  };

  const getUser = async () => {
    try {
      const res = await axios.get("/group/get-members", {
        headers: {
          authorization: sessionStorage.getItem("token"),
        },
      });

      const data = await res.data;

      // check for validation or any other errors
      if (!res.status === 200) {
        throw new Error(res.error);
      }

      let friendList = [];

      data.forEach((user) => {
        friendList.push({
          label: user.name,
          value: user._id,
        });
      });

      setFriends(friendList);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (props.getMember) {
      getUser();
    }
  }, [props.getMember]);

  const createGroup = async (e) => {
    const res = await axios.post(
      "/group/create-group",
      {
        creator: user.id,
        room: name,
        members: selectedFriends,
      },
      {
        withCredentials: true,
      },
      {
        headers: {
          authorization: sessionStorage.getItem("token"),
        },
      }
    );

    console.log(res);
  };

  const submitGroupHandler = (e) => {
    e.preventDefault();

    if (name.length <= 3) {
      return;
    }
    createGroup();
  };

  const value = {
    allItemsAreSelected: "All Memebrs are selected",
    clearSearch: "Clear Search",
    noOptions: "No options",
    search: "Search",
    selectAll: "Select All Members",
    selectSomeItems: "Select Friends",
  };

  return (
    <Modal onClose={props.modalShow}>
      <h2 className="form__heading">Create New Group</h2>
      <form className="form__body">
        <div className="form__control">
          <label>Group Name</label>
          <input
            type="text"
            value={name}
            onChange={setNameHandler}
            name="room"
          ></input>
        </div>
        <div className="form__control">
          <label>Group Memebrs : </label>
          <MultiSelect
            overrideStrings={value}
            className="form__select"
            options={friends}
            onClick={getUser}
            value={selectedFriends}
            onChange={setSelectedFriends}
            labelledBy="Select"
          />
        </div>

        <div className="form__button">
          <button onClick={submitGroupHandler}>Create</button>
        </div>
      </form>
    </Modal>
  );
}

export default GroupForm;
