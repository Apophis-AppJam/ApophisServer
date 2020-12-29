const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Chat = require('./chat')(sequelize, Sequelize);
db.Choice = require('./choice')(sequelize, Sequelize);
db.Reply = require('./reply')(sequelize, Sequelize);


db.User.hasMany(db.Reply,{onDelete:'cascade'}) 
db.Reply.belongsTo(db.User);

db.Chat.hasMany(db.Choice)
db.Choice.belongsTo(db.Chat)

db.Chat.hasMany(db.Reply)
db.Reply.belongsTo(db.Chat)

module.exports = db;
