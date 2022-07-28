import { Box, Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { CryptoState } from "../../CryptoContest";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const { setAlert } = CryptoState();

  const handleSubmit = async () => {
    if (password !== confirm) {
      setAlert({
        open: true,
        message: "Passwords do not match",
        type: "error",
      });
      return;
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setAlert({
        open: true,
        message: `Sign Up Successful. Welcome ${result.user.email}`,
        type: "success",
      });
      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
      return;
    }
  };

  return (
    <Box
      padding={3}
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <TextField
        margin="100"
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          marginLeft: 25,
          marginRight: 25,
          marginTop: 25,
        }}
      />
      <TextField
        variant="outlined"
        type="password"
        label="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          marginLeft: 25,
          marginRight: 25,
        }}
      />
      <TextField
        variant="outlined"
        type="password"
        label="Confirm Password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        style={{
          marginLeft: 25,
          marginRight: 25,
        }}
      />
      <Button
        variant="contained"
        size="large"
        style={{
          backgroundColor: "gold",
          marginLeft: 25,
          marginRight: 25,
          marginBottom: 25,
        }}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default SignUp;
