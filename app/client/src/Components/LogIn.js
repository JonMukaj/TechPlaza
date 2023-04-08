import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

const Root = styled("form")(({ theme }) => ({
  "& .MuiTextField-root": {
    margin: theme.spacing(1),
    width: "25ch",
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { email, password };
    console.log(data);
    axios.post("http://localhost:5000/login", data).then((res) => {
      console.log(res);
    });
    axios.post("https://techplaza-test.azurewebsites.net/login", data).then((res) => {
      console.log(res);
    });
  };

  return (
    <Root onSubmit={handleSubmit}>
      <TextField
        label="Email"
        type="email"
        variant="outlined"
        value={email}
        onChange={handleEmailChange}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <SubmitButton variant="contained" color="primary" type="submit">
        Login
      </SubmitButton>
    </Root>
  );
};

export default Login;
