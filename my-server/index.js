const express = require('express');
const app = express();
const PORT = 3001;
const cors = require('cors');
const userRoutes = require('./routers/usersRoutes');
const loginRoutes = require('./routers/loginRoutes');
const itemRoutes = require('./routers/itemRoutes');
const categoryRoutes = require('./routers/categoryRoutes');
const authenticateToken = require('./middleware/authenticateToken');

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// import the router from loginRoutes.js
app.use('/', loginRoutes);
// import the router from usersRoutes.js
app.use('/users', userRoutes);
// import the router from itemRoutes.js
app.use('/items', itemRoutes);
// import the router from categoryRoutes.js
app.use('/categories', categoryRoutes);

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT + '.');
});