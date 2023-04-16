const express = require("express");
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const  {NotFound, BadRequest, errorHandler}  = require('./errorHandler');
//const userRoutes = require('./routes/userRoutes');
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");


const whitelist = ["http://localhost:3000"];
app.use(express.json());
app.use(cors(whitelist));
// Middleware
//app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());


app.use(express.static(path.resolve(__dirname, '../client/build')));


// Landing page of React
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.get("/backend", (req, res) => {
  res.send({ express: "TOP G!ssssss" });
});


//app.use('/users', userRoutes);
//app.use(errorHandler);

//  Create a login route
app.post("/login", (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  res.send({ email, password });
});

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));
