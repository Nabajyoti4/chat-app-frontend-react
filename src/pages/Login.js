import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";

//matrial Ui
import Input from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "./../axios";

function Login() {
  // custom button styleing
  const btnStyle = {
    display: "flex",
    marginTop: "20px",
  };

  // hooks
  const history = useHistory(); // history hook
  const [email, setEmail] = useState(""); // email state
  const [password, setPassword] = useState(""); // password state
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  // password input handler
  const setPasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  //email inputhandler
  const setEmailHandler = (e) => {
    setEmail(e.target.value);
  };

  //email blur handelr
  const emailBlurHandler = (e) => {
    if (e.target.value === "") {
      setValidEmail(true);
      return;
    }
    setValidEmail(false);
  };

  //password blur handler
  const passwordBlurHandler = (e) => {
    if (e.target.value === "") {
      setValidPassword(true);
      return;
    }
    setValidPassword(false);
  };

  // login submit handler
  const loginHandler = async (e) => {
    e.preventDefault();

    //validation
    if (email === "") {
      setValidEmail(true);
      return;
    }
    if (password === "") {
      setValidPassword(true);
      return;
    }

    try {
      const res = await axios.post(
        "/auth/login",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      );

      sessionStorage.setItem("token", res.data.token);

      // if login is successfull route user to main chat
      history.push("/");
    } catch (err) {
      console.log("Error" + err);
    }
  };

  //store token in session storage

  return (
    <div className="home">
      <div className="home__body">
        <form className="login__form" method="post">
          <Input
            fullWidth
            type="email"
            name="email"
            label="Email"
            value={email}
            onBlur={emailBlurHandler}
            onChange={setEmailHandler}
            placeholder="enter email"
          ></Input>
          {validEmail && <p className="invalid__text">Enter a valid email</p>}
          <Input
            fullWidth
            type="passowrd"
            label="Password"
            name="password"
            value={password}
            onBlur={passwordBlurHandler}
            onChange={setPasswordHandler}
            placeholder="enter password"
          ></Input>
          {validPassword && (
            <p className="invalid__text">Enter a valid Password</p>
          )}
          <Button
            style={btnStyle}
            variant="contained"
            type="submit"
            color="primary"
            onClick={loginHandler}
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
