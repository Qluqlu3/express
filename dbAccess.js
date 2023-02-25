const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const port = 3000;

// MySQL接続情報
const connectionInfo = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'test',
};

// GETリクエスト
app.get('/', async (req, res) => {
  try {
    // MySQL接続
    const connection = await mysql.createConnection(connectionInfo);

    // クエリ実行
    const [rows] = await connection.execute('SELECT * FROM users');

    // MySQL接続終了
    await connection.end();

    // 結果を応答
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

//npm install express mysql2