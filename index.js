const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const Connection = require("./database/db");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const Router = require("./routes/route");
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', Router);

app.listen(PORT, () => {
    Connection();
    console.log(`Server is running successfully on PORT http://localhost:${PORT}`)
});