const express = require("express");
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const  {NotFound, BadRequest, errorHandler}  = require('../server/src/errors/errorHandler');
const userRoutes = require('../server/src/routes/userRoutes');
const categoriesRoutes = require('../server/src/routes/categoriesRoutes');
const productsRoutes=require("../server/src/routes/productsRoutes");
const authorizationRoutes=require("../server/src/routes/authorizationRoutes");
const orderRoute=require('../server/src/routes/orderRoute');
const reviewRoute=require("../server/src/routes/reviewRoute");
const shippingRoute=require("../server/src/routes/shippingAddressRoutes");


const app = express();
const port = process.env.PORT || 5000;
const path = require("path");
const jwtCheck = require("./src/config/jwtCheck");
const testJwt=require("./src/config/jwt");


const whitelist = ["http://localhost:3000"];
app.use(express.json());
app.use(cors(whitelist));

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());


app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(express.static(path.resolve(__dirname, '../server/src/images')));   //http://localhost:5000/im.png
 

app.get("/backend", (req, res) => {
  res.send({ express: "TOP G!i" });
});

app.use("/orders",jwtCheck,orderRoute);
app.use("/authorization",authorizationRoutes);
app.use("/reviews",reviewRoute);
app.use('/users', jwtCheck,userRoutes);
app.use('/categories',categoriesRoutes);
app.use("/shipping",shippingRoute);
app.use("/products", productsRoutes);

app.use(errorHandler);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));