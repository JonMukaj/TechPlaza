const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");

const whitelist = ["http://localhost:3000", "http://localhost:5000"];
app.use(express.json());
app.use(cors(whitelist));

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get("/backend", (req, res) => {
  res.send({ express: "TOP G!" });
});

app.get("/test", (req, res) => {
  res.send({ express: "Test route" });
});

//  Create a login route
app.post("/login", (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  res.send({ email, password });
});
