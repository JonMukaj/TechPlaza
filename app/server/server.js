const express = require("express");
const app = express();
const port = process.env.PORT || 5050;
const cors = require("cors");
const path = require("path");

const whitelist = ["http://localhost:3000"];
app.use(express.json());
app.use(cors(whitelist));

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.static(path.resolve(__dirname, '../client/build')));


app.get("/backend", (req, res) => {
  res.send({ express: "TOP G!" });
});

//  Create a login route
app.post("/login", (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  res.send({ email, password });
});

// Landing page of React
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});