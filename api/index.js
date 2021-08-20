const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

//Import Routes
// const authRoute = require('./routes/auth');


//Route Middlewares
// app.use('/api/user', authRoute);

mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true })
    .then((result) => console.log('connected to db'))
    .catch((err) => console.log(err));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));