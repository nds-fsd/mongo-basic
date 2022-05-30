const express = require('express');
const userController = require('./controllers/usersController');
const mongo = require('./mongo');
const cors = require('cors')

const app = express();
app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }))
  

app.use(express.json()) // for parsing application/json

app.listen(3001,()=>{
    console.log("App is listening on port: ", 3001);
});

app.use('/users', userController);

