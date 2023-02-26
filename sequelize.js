// npm install express sequelize mysql2
const express = require('express');
const Sequelize = require('sequelize');

const app = express();
const port = 3000;

// Sequelizeの初期化
const sequelize = new Sequelize('test', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

// モデルの定義
const User = sequelize.define('User', {
  name: Sequelize.STRING,
  age: Sequelize.INTEGER,
  email: Sequelize.STRING,
});

// テーブルの作成
sequelize.sync().then(() => {
  console.log('Table created');
});

// GETリクエスト
app.get('/users', async (req, res) => {
  try {
    // ユーザーの取得
    const users = await User.findAll();

    // 結果を応答
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// POSTリクエスト
app.post('/users', async (req, res) => {
  try {
    // ユーザーの作成
    const user = await User.create(req.body);

    // 結果を応答
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// PATCHリクエスト
app.patch('/users/:id', async (req, res) => {
  try {
    // ユーザーの更新
    const user = await User.findByPk(req.params.id);
    await user.update(req.body);

    // 結果を応答
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
