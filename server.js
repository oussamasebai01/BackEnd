import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan'; // Importer morgan
import cors from 'cors'; // Importer cors
import userRoutes from './Routes/User.js';
import employeeRoutes from './Routes/Epmloyee.js'
import congeeRoutes from './Routes/Congee.js'
import formulaireRoutes from './Routes/Formulaire.js'
import condidatRoutes from './Routes/Condidat.js'

import fs from 'fs';
import { google } from 'googleapis';
const service = google.sheets('v4');

import credentials from './credentials.json' assert { type: 'json' };

const authClient = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key.replace(/\\n/g, "\n"),
    ["https://www.googleapis.com/auth/spreadsheets"]
);

(async function () {
    try {

        // Authorize the client
        const token = await authClient.authorize();

        authClient.setCredentials(token);

        const res = await service.spreadsheets.values.get({
            auth: authClient,
            spreadsheetId: '1QsTYSQ7GEIGXuLA3xltQTYvwOu_aswg5feqJr4lVQY0',
            range: 'A:D',
        });

         // All of the answers
         const answers = [];

         // Set rows to equal the rows
         const rows = res.data.values;

         if(rows.length)
         {
            // Remove the headers
            rows.shift()
            for (const row of rows) {
                answers.push({ timeStamp: row[0], email: row[1],age:row[2] , domaine:row[3]});
            }

         }
         else
         console.log("No data found.");

         /*fs.writeFile("answers.json", JSON.stringify(answers), function (err, file) {
            if (err) throw err;
            console.log("Saved!");
        });*/


    } catch (error) {

        // Log the error
        console.log(error);

        // Exit the process with error
        process.exit(1);

    }

})();

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
app.use(cors({
    origin: true,
    credentials: true
  }));
app.use(express.urlencoded({ extended: false }));
app.use('/user', userRoutes);
app.use('/employee',employeeRoutes);
app.use('/congee',congeeRoutes);
app.use('/formulaire',formulaireRoutes);
app.use('/condidat',condidatRoutes),
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
