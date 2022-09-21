/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
require('dotenv').config();

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const mode = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.js`)[mode];
const db = {};

const sequelize = new Sequelize(config);

sequelize
  .authenticate()
  .then(() => {
    console.log(`${mode} DATABASE CONNECTION ESTABLISHED!`);
  })
  .catch((err) => {
    console.log('Unable to connect to the database: ', err);
  });
//

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
