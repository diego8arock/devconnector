const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
const retries = 5;

const connectDB = async () => {
  let tries = 0;
  let connected = false;
  while (tries < retries) {
    console.error('Trying to connect MongoDB: ' + tries);
    try {
      await mongoose.connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      });
      console.log('MongoDB Connected...');
      connected = true;
      tries = retries;
    } catch (err) {
      console.error('MongoDB Failed to Connect');
      console.error(err.message);
      tries++;
    }
  }
  if (!connected) {
    //Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
