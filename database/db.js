const mongoose = require("mongoose");
const Connection = async () => {
    const URL = process.env.MONGO_DB;
    try {
        await mongoose.connect(URL, { useNewUrlParser: true })
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting to the database ', error);
    }
};

mongoose.connection.on('disconnected', () => {
    console.log("mongoDb disconnected");
});
mongoose.connection.on('connected', () => {
    console.log("mongoDb connected");
});

module.exports = Connection;