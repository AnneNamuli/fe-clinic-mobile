import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import { createBrowserHistory } from "history";

const history = createBrowserHistory({ forceRefresh: true });

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

const SignUp = ({ handleClose }) => {
  const classes = useStyles();
  // create state variables for each input
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDoB] = useState("");
  const [gender, setGender] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = phoneNumber + "@clinic-mobile.com";
    const fullName = firstName + " " + lastName;
    const url = `http://localhost/api/v1/users/open`;
    const data = {
      full_name: fullName,
      first_name: firstName,
      last_name: lastName,
      id_number: idNumber,
      phone_number: phoneNumber,
      date_of_birth: dob,
      gender,
      email,
      password,
    };
    return axios.post(url, data).then((res) => {
      history.push({
        pathname: `/Login`,
      });
    });
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <TextField
        label="First Name"
        variant="filled"
        required
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        label="Last Name"
        variant="filled"
        required
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <TextField
        label="Phone Number"
        variant="filled"
        required
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <TextField
        label="Date of birth"
        variant="filled"
        type="date"
        required
        InputLabelProps={{ shrink: true }}
        value={dob}
        onChange={(e) => setDoB(e.target.value)}
      />
      <TextField
        id="select"
        select
        label="Gender"
        variant="filled"
        required
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <MenuItem value="Female">Female</MenuItem>
        <MenuItem value="Male">Male</MenuItem>
      </TextField>
      <TextField
        label="ID number"
        variant="filled"
        required
        value={idNumber}
        onChange={(e) => setIdNumber(e.target.value)}
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
        <Button variant="contained" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Signup
        </Button>
      </div>
    </form>
  );
};

export default SignUp;
