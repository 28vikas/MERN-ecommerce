const mongoose = require('mongoose');
const mongoURI = process.env.mongoURI;

const db = mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
}).then(() => {
  console.log('MongoDB connected...');
}).catch((err) => {
  console.log(err);
});

module.exports = db;
