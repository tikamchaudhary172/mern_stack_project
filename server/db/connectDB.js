const mongoose = require('mongoose');
const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false
}).then(() => {
  console.log('Database Connected Successfully ...')
}).catch((err) => { console.log(`Database Not Connected ...\n${err}`) })
