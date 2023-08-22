const express = require('express');
const app = express();
const studentRoutes = require('./controllers/routers/studentRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import the router from studentRoutes.js
app.use('/students', studentRoutes);

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});