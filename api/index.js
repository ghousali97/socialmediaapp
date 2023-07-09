const express = require('express');
require('dotenv').config();
const path = require('path');
const port = process.env.PORT || 4000;
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');


const db = require("./utils/db");
const cors = require('cors');
const cookieParser = require('cookie-parser');


const app = express();
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000', 'https://brave-dune-0803e6c00.3.azurestaticapps.net'],
    credentials: true
}));
app.use(cookieParser());

app.use('/api/auth/', authRoutes);
app.use('/api/user/', userRoutes);
app.use('/api/post/', postRoutes);
app.use('/api/comment/', commentRoutes);
app.listen(port, () => {
    console.log('server listening on port: ' + port);
})

