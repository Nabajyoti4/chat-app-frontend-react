import React, { useEffect } from "react";
import "./Home.css";
import axios from "../axios";
import { useHistory } from "react-router-dom";
import socket from "../socket/socket";

//redux
//Redux
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";

//components
import Sidebar from "../components/Sidebar/Sidebar";
import ChatPanel from "../components/ChatPanel/ChatPanel";

export const Home = () => {
  const history = useHistory(); // history hook
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  // get chat function to get all data os user
  useEffect(() => {
    const getChat = async () => {
      try {
        const res = await axios.get("/auth/chat", {
          withCredentials: true,
        });

        const data = await res.data;

        // check for validation or any other errors
        if (!res.status === 200) {
          throw new Error(res.error);
        }

        dispatch(authActions.login(data));
      } catch (err) {
        console.log(err);
        history.push("/login");
      }
    };

    getChat();
  }, []);

  useEffect(() => {
    socket.connect();
    socket.emit("user", user);
    socket.on("welcome", (data) => {
      console.log(data);
    });
  }, [user]);

  return (
    <div className="App">
      <div className="app__body">
        <Sidebar></Sidebar>
        {/* Chatpanel */}
        <ChatPanel name={user.name}></ChatPanel>
      </div>
    </div>
  );
};

export default Home;
