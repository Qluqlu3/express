const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let users = [];

// app.get('/', (req, res) => {
//   res.send('Express.js');
// });

let data = { id: 1, message: 'Hello, World!' };

// GETリクエスト
app.get('/', (req, res) => {
  res.json(data);
});

// POSTリクエスト
app.post('/', (req, res) => {
  data = req.body;
  res.json(data);
});

// PATCHリクエスト
app.patch('/', (req, res) => {
  data.message = req.body.message;
  res.json(data);
});

app.post('/users', (req, res) => {
  const { name, email } = req.body;
  const user = { id: users.length + 1, name, email };
  users.push(user);
  res.status(201).json(user);
});

app.patch('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;
  const user = users.find((user) => user.id === id);
  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

app.listen(port, () => {
  console.log(`起動: http://localhost:${port}`);
});
