import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import oauth from "axios-oauth-client";



const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "300px",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
}));

const Login = ({ handleClose }) => {
  const classes = useStyles();
  // create state variables for each input
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(phoneNumber, password);
    handleClose();
  };

  async function loginAction(phone_number, password) {
    const modifiedEmail = phoneNumber + "@clinic-mobile.com";
    const getOwnerCredentials = oauth.client(axios.create(), {
      url: `http://localhost/api/v1/users/open`,
      grant_type: "password",
      username: modifiedEmail,
      password: password,
    });

    const auth = getOwnerCredentials();
    sessionStorage.setItem("token", auth.access_token);
    sessionStorage.setItem("email", phoneNumber);
  }

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <TextField
        label="Phone Number"
        variant="filled"
        required
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <TextField
        label="Password"
        variant="filled"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>
        <Button variant="contained" onClick={handleClose}  color="primary">
          Sign In
        </Button>
        <Button type="submit" variant="contained">
          Signup
        </Button>
      </div>
    </form>
  );
};

export default Login;
