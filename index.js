const express = require('express');
const app = express();
const PORT = 3001;
const userRoutes = require('./my-server/routers/usersRoutes');
const cors = require('cors');
const loginRoutes = require('./my-server/routers/loginRoutes');
const authenticateToken = require('./my-server/middleware/authenticateToken');

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

/*
  authenticateToken is a middleware function that checks if the request has a valid JWT token. For example
 */
// cartRoutes
// app.get('/cart', authenticateToken, async (req, res) => {
//     // 因为 `authenticateToken` 中间件已经验证了用户的 token，
//     // 并且将解密的用户数据附加到了 req.user，
//     // 所以你可以使用 req.user.id 来获取当前登录的用户的 ID。
//
//     const userId = req.user.id;
//
//     try {
//         // 使用 userId 从数据库中查询该用户的购物车内容。
//         // 这只是一个伪代码示例，你需要根据你的数据库设置进行相应的修改。
//         const cartItems = await database.query('SELECT * FROM cart WHERE user_id = ?', [userId]);
//
//         res.json(cartItems);
//     } catch (error) {
//         console.error('Error fetching cart:', error);
//         res.status(500).send('Error fetching cart');
//     }
// });

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT + '.');
});