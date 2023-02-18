import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan'; // Importer morgan
import cors from 'cors'; // Importer cors
import userRoutes from './Routes/User.js';


const port = process.env.PORT || 9091;
const databaseName = 'BoomRH';
const app = express();

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose
    .connect(`mongodb://localhost:27017/BoomRH`/*, {bufferCommands: false ,useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }*/)
    .then(() => {
        console.log(`Connected to ${databaseName}`);
    })
    .catch(err => {
        console.log(err);
    });
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use('/user', userRoutes);
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});