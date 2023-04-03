const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.static("../client/build"));
app.use(express.json());

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/backend', (req, res) => {
  res.send({ express: 'TOP G!' });
});


// All other unmatched requests will return the React app
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));});
