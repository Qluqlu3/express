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
  name: {
    type: Sequelize.STRING,
    primaryKey: true,
    autoIncrement: true,
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 18,
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
});

// テーブルの作成
sequelize.sync().then(() => {
  console.log('Table created');
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
