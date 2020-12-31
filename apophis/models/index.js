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
db.ChoiceWords = require('./choiceWords')(sequelize, Sequelize);
db.Reply = require('./reply')(sequelize, Sequelize);
db.ReplyWords = require('./replyWords.js')(sequelize, Sequelize);
db.ChatDetails = require('./chatDetails.js')(sequelize, Sequelize);


/* 1: N User:Reply */
db.User.hasMany(db.Reply,{onDelete:'cascade',foreignKey: 'UserIdx',sourceKey:'UserIdx'}) 
db.Reply.belongsTo(db.User,{foreignKey: 'UserIdx',targetKey:'UserIdx'});

/* 1: N ChatDetails:Chat */
db.ChatDetails.hasMany(db.Chat,{onDelete:'cascade',foreignKey: 'ChatDetailsIdx',sourceKey:'ChatDetailsIdx'})
db.Chat.belongsTo(db.ChatDetails,{foreignKey: 'ChatDetailsIdx',targetKey:'ChatDetailsIdx'})

/* 1: N ChatDetails:ChoiceWords */
db.ChatDetails.hasMany(db.ChoiceWords,{onDelete:'cascade',foreignKey: 'chatAction',sourceKey:'chatAction'})
db.ChoiceWords.belongsTo(db.ChatDetails,{foreignKey: 'chatAction',targetKey:'chatAction'})

/* 1: N Reply:ReplyWords */
db.Reply.hasMany(db.ReplyWords,{onDelete:'cascade',foreignKey: 'ReplyIdx',sourceKey:'ReplyIdx'})
db.ReplyWords.belongsTo(db.Reply,{foreignKey: 'ReplyIdx',targetKey:'ReplyIdx'})

/* 1: N ChatDetails:Reply */
db.ChatDetails.hasMany(db.Reply,{onDelete:'cascade',foreignKey: 'chatAction',sourceKey:'chatAction'})
db.Reply.belongsTo(db.ChatDetails,{foreignKey: 'chatAction',targetKey:'chatAction'})


module.exports = db;
