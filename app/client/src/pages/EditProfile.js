import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import dayjs from "dayjs";

const EditProfile = () => {
  const [user, setUser] = useState({});
  const [editUser, setEditUser] = useState({});
  const [isModified, setIsModified] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  useEffect(() => {
    setIsModified(JSON.stringify(user) !== JSON.stringify(editUser));
  }, [user, editUser]);

  useEffect(() => {
    let cleanUP = false;
    const savedUser = JSON.parse(localStorage.getItem("user"));
    console.log(savedUser);
    if (savedUser.account) {
      setUser(savedUser.account);
      setEditUser(savedUser.account);
    }
    return () => {
      cleanUP = true;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload = {
      ...editUser,
      phoneNumber: editUser.phone,
    };
    delete payload.phone;
    delete payload.id;
    delete payload.roleId;
    delete payload.iat;
    delete payload.image;
    delete payload.exp;
    delete payload.email;
    try {
      const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
      await axios.put(`/users/${user.id}`, payload, {
        headers: { Authorization: `Token ${accessToken}` },
      });
      logout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {editUser ? (
        <Container
          maxWidth="md"
          sx={{
            marginTop: 20,
            marginBottom: 20,
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <AppBar position="inherit">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                User Information (Editing user Information will log you out)
              </Typography>
            </Toolbar>
          </AppBar>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "30ch", marginBottom: 4 },
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={2} sx={{ marginTop: 7, marginBottom: 7 }}>
              <Grid item xs={12} sm={6} align="center">
                <TextField
                  id="outlined-basic"
                  label="Firstname"
                  variant="outlined"
                  value={editUser.firstname}
                  onChange={(e) =>
                    setEditUser({ ...editUser, firstname: e.target.value })
                  }
                />
                <TextField
                  id="outlined-basic"
                  label="Address"
                  variant="outlined"
                  value={editUser.address}
                  onChange={(e) =>
                    setEditUser({ ...editUser, address: e.target.value })
                  }
                />
                <FormControl
                  fullWidth
                  sx={{ m: 1, width: "63%", minWidth: 30, marginBottom: 4 }}
                  size="medium"
                >
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Gender"
                    value={editUser.gender}
                    onChange={(e) =>
                      setEditUser({ ...editUser, gender: e.target.value })
                    }
                  >
                    <MenuItem value={"male"}>Male</MenuItem>
                    <MenuItem value={"female"}>Female</MenuItem>
                    <MenuItem value={"other"}>Other</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  id="outlined-basic"
                  label="Username"
                  variant="outlined"
                  value={editUser.username}
                  onChange={(e) =>
                    setEditUser({ ...editUser, username: e.target.value })
                  }
                />
                <TextField
                  id="outlined-basic"
                  label="Phone Number"
                  variant="outlined"
                  value={editUser.phone}
                  onChange={(e) =>
                    setEditUser({ ...editUser, phone: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} align="center">
                <TextField
                  id="outlined-basic"
                  label="Lastname"
                  variant="outlined"
                  value={editUser.lastname}
                  onChange={(e) =>
                    setEditUser({ ...editUser, lastname: e.target.value })
                  }
                />
                <TextField
                  id="outlined-basic"
                  label="City"
                  variant="outlined"
                  value={editUser.city}
                  onChange={(e) =>
                    setEditUser({ ...editUser, city: e.target.value })
                  }
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={editUser.birthday ? dayjs(editUser.birthday) : null}
                    onChange={(date) =>
                      setEditUser({
                        ...editUser,
                        birthday: date ? date.format("YYYY-MM-DD") : null,
                      })
                    }
                    format="YYYY-MM-DD"
                  />
                </LocalizationProvider>
                {/* <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  value={editUser.email}
                  onChange={(e) =>
                    setEditUser({ ...editUser, email: e.target.value })
                  }
                /> */}
              </Grid>
            </Grid>
          </Box>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": {
                m: 1,
                width: "30ch",
                boxShadow: 1,
                marginBottom: 4,
              },
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={2}>
              <Grid xs={8}>
                <Button
                  size="large"
                  variant="contained"
                  sx={{ marginLeft: 12, marginRight: 5, marginBottom: 10 }}
                  onClick={async (event) => await handleSubmit(event)}
                  disabled={!isModified}
                >
                  Confirm
                </Button>
                <Button
                  size="large"
                  variant="outlined"
                  sx={{ marginBottom: 10 }}
                  onClick={() => {
                    setEditUser({
                      ...user,
                      firstname: user.firstname ? user.firstname : "",
                      lastname: user.lastname ? user.lastname : "",
                      address: user.address ? user.address : "",
                      gender: user.gender ? user.gender : "",
                      username: user.username ? user.username : "",
                      phone: user.phone ? user.phone : "",
                      city: user.city ? user.city : "",
                      birthday: user.birthday ? user.birthday : null,
                      email: user.email ? user.email : "",
                    });
                  }}
                  disabled={!isModified}
                >
                  Reset
                </Button>
              </Grid>
              <Grid xs={4}></Grid>
            </Grid>
          </Box>
        </Container>
      ) : null}
    </>
  );
};

export default EditProfile;
