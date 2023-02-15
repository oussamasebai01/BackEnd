const express = require ('express');
const router = require ("./Routes/User")
const mongoose = require ("mongoose");
const bodyParser = require("body-parser")
const port = process.env.PORT || 9091;
const databaseName = 'BoomRH';

const app = express();
mongoose
    .connect(`mongodb://localhost:27017/BoomRH`, {bufferCommands: false ,useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(() => {
        console.log(`Connected to ${databaseName}`);
    })
    .catch(err => {
        console.log(err);
    });
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());


app.use('/user', router);
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});