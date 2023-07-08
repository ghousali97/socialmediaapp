const express = require('express');
require('dotenv').config();
const path = require('path');
const port = process.env.PORT || 4000;
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');


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
    origin: "http://localhost:3000"
}));
app.use(cookieParser());

app.use('/api/auth/', authRoutes);
app.use('/api/user/', userRoutes);
app.listen(port, () => {
    console.log('server listening on port: ' + port);
})

