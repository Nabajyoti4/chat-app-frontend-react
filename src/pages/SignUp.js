import React, { useState } from "react";
import "./Login.css";
//matrial Ui
import Input from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { useHistory } from "react-router-dom";

function SignUp() {
  const btnStyle = {
    display: "flex",
    marginTop: "20px",
  };

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [avatar, setAvatar] = useState({});
  const history = useHistory();

  let name, value;
  // user input handler
  const userStoreHandler = (e) => {
    console.log(e);
    name = e.target.name;

    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  //store image
  const imageHandler = (e) => {
    setAvatar(e.target.files[0]);
  };

  //store data
  const postData = async (e) => {
    e.preventDefault();

    let fromData = new FormData();
    fromData.append("name", user.name);
    fromData.append("email", user.email);
    fromData.append("phone", user.phone);
    fromData.append("password", user.password);
    fromData.append("avatar", avatar);

    try {
      const res = await axios({
        method: "post",
        url: `${process.env.REACT_APP_URL}/auth/register`,
        headers: {
          "content-type": "multipart/form-data",
        },
        data: fromData,
      });

      console.log(res);
      toast("User Created!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      history.push("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="home">
      <ToastContainer />
      <div className="home__body">
        <form
          className="login__form"
          method="post"
          encType="multipart/form-data"
        >
          <div className="login__control">
            <Input
              fullWidth
              variant="outlined"
              type="text"
              label="Name"
              placeholder="enter Name"
              name="name"
              value={user.name}
              onChange={userStoreHandler}
            ></Input>
          </div>
          <div className="login__control">
            <Input
              fullWidth
              variant="outlined"
              type="text"
              label="Email"
              placeholder="enter email"
              name="email"
              value={user.email}
              onChange={userStoreHandler}
            ></Input>
          </div>
          <div className="login__control">
            <Input
              fullWidth
              type="passowrd"
              variant="outlined"
              label="Password"
              placeholder="enter password"
              name="password"
              value={user.password}
              onChange={userStoreHandler}
            ></Input>
          </div>
          <div className="login__control">
            <Input
              fullWidth
              variant="outlined"
              type="number"
              label="Phone Number"
              placeholder="enter phone number"
              name="phone"
              value={user.phone}
              onChange={userStoreHandler}
            ></Input>
          </div>

          <div className="login__control">
            <Input
              fullWidth
              variant="outlined"
              type="file"
              placeholder="enter your Profile Picture"
              onChange={imageHandler}
            ></Input>
          </div>

          <div className="login__btn">
            <Button
              style={btnStyle}
              variant="contained"
              type="submit"
              color="primary"
              onClick={postData}
            >
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
