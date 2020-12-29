const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// 여기에 디비 관계도
// db.Alert = require('./alert')(sequelize, Sequelize);
// db.Comment = require('./comment')(sequelize, Sequelize);
// db.Creator = require('./creator')(sequelize, Sequelize);

// db.Creator.hasMany(db.Comment, {onDelete: 'cascade'});
// db.Comment.belongsTo(db.Creator);

module.exports = db;