import React from "react";
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

const EditProfile = () => {
  return (
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
            User
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
            />
            <TextField id="outlined-basic" label="Address" variant="outlined" />
            <FormControl
              fullWidth
              sx={{ m: 1, width: "63%", minWidth: 30, marginBottom: 4 }}
              size="medium"
            >
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                //onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Phone Number"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6} align="center">
            <TextField
              id="outlined-basic"
              label="Lastname"
              variant="outlined"
            />
            <TextField id="outlined-basic" label="City" variant="outlined" />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker />
            </LocalizationProvider>
            <TextField id="outlined-basic" label="Email" variant="outlined" />
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
            >
              Confirm
            </Button>
            <Button size="large" variant="outlined" sx={{ marginBottom: 10 }}>
              Reset
            </Button>
          </Grid>
          <Grid xs={4}></Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default EditProfile;
