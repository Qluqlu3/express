const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

// モデル定義
const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  age: {
    type: Sequelize.INTEGER,
  },
});

// モデルに対して条件を指定して一つのデータを取得するための関数
User.findOne({ where: { firstName: 'John' } }).then((user) => {
  console.log(user);
});

// モデルに対して条件を指定してデータを取得するが、該当するデータが存在しない場合は新規作成するための関数
User.findOrCreate({
  where: { firstName: 'John', lastName: 'Doe' },
  defaults: { age: 30 },
}).then(([user, created]) => {
  console.log(user.get({ plain: true }));
  console.log(created);
});

// モデルに対して条件を指定してデータを取得し、該当するデータの数も取得するための関数
User.findAndCountAll({ where: { lastName: 'Doe' } }).then((result) => {
  console.log(result.count);
  console.log(result.rows);
});
