const express = require('express')
const router = express.Router();
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const mongoDbConnection = require('./db/connection');

const app = express()
const port = process.env.PORT || 5000;

const postRoute = require('./routes/posts');

app.use(cors({ origin: 'http://localhost:3000',
  methods: ['GET', 'POST','PUT','PATCH','DELETE'], 
  allowedHeaders: ['Content-Type'],
}));
app.use('/uploads', express.static(path.join(__dirname,  'middlewares/uploads')));

app.use('/api', postRoute);



mongoDbConnection();


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})