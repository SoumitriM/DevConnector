const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
// const db = process.env.MONGO_URI;
// console.log('here', process.env.JWT_TOKEN);
const connectDB = async () => {
  try {
    await mongoose.connect(db), {
      useNewUrlParser: true,
      useCreateIndex: true
    };
    console.log('mongodb connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

module.exports = connectDB;