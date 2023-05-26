const express = require('express');
const { sequelize } = require('./models');
const app = express();
const cors = require('cors');
const paginate = require('./helper/paginate');
const { isUserValid, isTokenValid } = require('./middleware/verify');
require('dotenv').config();

const PORT = process.env.LOCALHOST_PORT || process.env.PRODUCTION_PORT;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const registrationRouter = require('./routes/registration');
app.use('/api/registration', registrationRouter);

const loginRouter = require('./routes/login');
app.use('/api/login', loginRouter);

const usersRouter = require('./routes/users');
app.use('/api/users', isTokenValid, usersRouter);

const postsRouter = require('./routes/posts');
app.use('/api/posts', isTokenValid, paginate, postsRouter);

const commentsRouter = require('./routes/comments');
app.use('/api/comments', isTokenValid, paginate, commentsRouter);


app.listen(PORT, async () => {
  console.log(`server is running on ${PORT}`)
  await sequelize.authenticate()
})