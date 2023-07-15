const express = require('express');
require('dotenv').config();
const path = require('path');
const multer = require('multer')
const port = process.env.PORT || 4000;
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const likeRoutes = require('./routes/like');
const relationshipRoutes = require('./routes/relationship');

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


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/upload");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
});


app.use('/api/auth/', authRoutes);
app.use('/api/user/', userRoutes);
app.use('/api/post/', postRoutes);
app.use('/api/like/', likeRoutes);
app.use('/api/comment/', commentRoutes);
app.use('/api/relationship/', relationshipRoutes);


app.listen(port, () => {
    console.log('server listening on port: ' + port);
})

