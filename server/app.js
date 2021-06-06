const express = require('express');
const mongoose = require('mongoose');
const { MONGOURI } = require('./keys');

const app = express();
const port = 5000;

mongoose
  .connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('MogoDB Connected');
  })
  .catch((e) => {
    console.error('Connection Error', e);
  });
// mongoose.connection.on(`connected`, () => {
//   console.log('MongoDB Connected');
// });
// mongoose.connection.on(`error`, () => {
//   console.log('Connection Error');
// });

// Modal
// require('./models/user');
// require('./models/post')
// require('./models/class')
// require('./models/library')
// require('./models/question')
// require('./models/classpost')
// require('./models/notice')
// require('./models/result')
// require('./models/routine')

// All data convert json format
app.use(express.json());

app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/classes'));
app.use(require('./routes/library'));
app.use(require('./routes/question'));
app.use(require('./routes/user'));

// Initial router
// app.get('/',(req,res)=>{
//     res.send('Hello')
// })

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
