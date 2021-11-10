const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;

const tasksRoute = require('./src/Routes/tasksRoute');
const loginRoute = require('./src/Routes/loginRoute');
const usersRoute = require('./src/Routes/usersRoute');

app.use(express.json({
  type: ['application/json', 'text/plain']
})); //https://stackoverflow.com/questions/54016068/empty-body-in-fetch-post-request

app.use(cors());

app.use('/tasks', tasksRoute);
app.use('/login', loginRoute);
app.use('/users', usersRoute);

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));