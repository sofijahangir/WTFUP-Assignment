const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const initialFun = require('./config/initialFun');

// Routes

// const authRoutes = require('./routes/auth.routes');
// const userRoutes = require('./routes/user.routes');

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// database
const db = require('./models');

// db.sequelize
//   .sync()
//   .then(function () {
//     console.log('DB connection sucessful.');
//   })
// .catch((err) => console.log('error has occured'));
db.sequelize.sync({ force: true }).then(() => {
  console.log('DB connection sucessful { force: true }');
  initialFun();
});

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// app.use('/api/auth', authRoutes);
// app.use('/api/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
