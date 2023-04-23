require('dotenv').config({path:'./config.env'})
const express = require('express');
const fs = require('fs');
const path = require('path');
const logger = require('./middleware/logger');

const connectDB = require("./config/mongo/db");
const cors = require('cors');

const app = express();

app.use(
  cors({
    allowedHeaders: ["authorization", "Content-Type"], // you can change the headers
    exposedHeaders: ["authorization"], // you can change the headers
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false
  })
)

app.use(express.urlencoded({extended: true}));
app.use(express.json());

connectDB();

app.use('/api/sub', require('./routes/submission'))
app.use('/api/data', require('./routes/fetchdata'))
app.use('/api/file', require('./routes/deletefile'))
app.use('/api/client', require('./routes/client'))

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/dist')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client','dist','index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send('API running...')
  })
}


const PORT = process.env.PORT || 5000;
app.listen(2000, () => logger.info(`Server listening on port ${PORT}`));

// HEROKU DEPLOYMENT, FINAL STAGE OF DEPLOYMENT, HOPEFULLY THIS TRIGGERS THE PUSH, COMMIT AND ETC
