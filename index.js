const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser');
const router = require('./routers');
const cors = require('cors');

mongoose.connect('mongodb://localhost:27017/testdb')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));
const db = mongoose.connection

db.on('error', (err) => {
    console.log(err);

})

db.once('open', () => {
    console.log('Database connected!');

})

const app = express()
app.use(cors());
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.get("/", (req, res) => {
    res.json("Đố em biết anh đang nghĩ gì!");
});
router(app)
const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Domain: http://localhost:${PORT}`);
})