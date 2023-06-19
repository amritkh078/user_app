const express = require('express');
const client = require('./config/dbcon.js');
const router = require('./routes/appRoutes.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use( router);

client.connect(
    function(err) {
        if (err) {
            console.log("Error connecting to database", err);
        } else {
            console.log("Database successfully connected");
        }
    }
);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});