import React, { useState } from "react";
import "./Login.css";
//matrial Ui
import Input from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Avatar } from "@material-ui/core";

import axios from "axios";

function SignUp() {
  const btnStyle = {
    display: "flex",
    marginTop: "20px",
  };

  const avatarStyle = {
    width: "100px",
    height: "100px",
  };

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [avatar, setAvatar] = useState({});

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

    console.log(fromData);

    console.log(user);
    const res = await axios({
      method: "post",
      url: "http://localhost:3002/auth/register",
      headers: {
        "content-type": "multipart/form-data",
      },
      data: fromData,
    });

    console.log(res);
  };

  return (
    <div className="home">
      <div className="home__body">
        <Grid align="center">
          <Grid align="center">
            <Avatar
              style={avatarStyle}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwIT6unmOV7VlYD1PKD0_WKFBBor3EQisCCg&usqp=CAU"
            ></Avatar>
          </Grid>

          <form
            className="login__form"
            method="post"
            encType="multipart/form-data"
          >
            <Input
              fullWidth
              type="text"
              label="Name"
              placeholder="enter Name"
              name="name"
              value={user.name}
              onChange={userStoreHandler}
            ></Input>

            <Input
              fullWidth
              type="text"
              label="Email"
              placeholder="enter email"
              name="email"
              value={user.email}
              onChange={userStoreHandler}
            ></Input>
            <Input
              fullWidth
              type="passowrd"
              label="Password"
              placeholder="enter password"
              name="password"
              value={user.password}
              onChange={userStoreHandler}
            ></Input>
            <Input
              fullWidth
              type="number"
              label="Phone Number"
              placeholder="enter phone number"
              name="phone"
              value={user.phone}
              onChange={userStoreHandler}
            ></Input>
            <Input
              fullWidth
              type="file"
              label="Add Avatarr"
              placeholder="enter your Profile Picture"
              onChange={imageHandler}
            ></Input>
            <Button
              style={btnStyle}
              variant="contained"
              type="submit"
              color="primary"
              onClick={postData}
            >
              Sign Up
            </Button>
          </form>
        </Grid>
      </div>
    </div>
  );
}

export default SignUp;
