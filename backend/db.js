//This Code is to connect to database.
//To On/Off wordwrap go to settings and command pallette and search for toggle word wrap or simply(Alt+Z)
//(Alt+ up arrow to move line upwards, u no need to select the line also.)
const mongoose = require('mongoose');

const connectToMongo = async () => {
    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/data', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.error("Connected To MOngoDb ");
    } catch (err) {
      console.error("Could not connect to MongoDB", err);
    }
  };

module.exports = connectToMongo;