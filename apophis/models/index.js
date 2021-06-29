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
db.ReplyType= require('./replyType')(sequelize, Sequelize);
db.ReplyWords = require('./replyWords.js')(sequelize, Sequelize);
db.ChatDetails = require('./chatDetails.js')(sequelize, Sequelize);
db.Letter = require('./letter.js')(sequelize, Sequelize);
db.LetterReceive = require('./letterReceive.js')(sequelize, Sequelize);
db.BucketList = require('./bucketList.js')(sequelize, Sequelize);

/* 1: N User:Reply */
db.User.hasMany(db.Reply,{onDelete:'cascade',foreignKey: 'UserIdx',sourceKey:'UserIdx'}) 
db.Reply.belongsTo(db.User,{foreignKey: 'UserIdx',targetKey:'UserIdx'});

/* 1: N ChatDetails:Chat */
db.ChatDetails.hasMany(db.Chat,{onDelete:'cascade',foreignKey: 'ChatDetailsIdx',sourceKey:'ChatDetailsIdx'})
db.Chat.belongsTo(db.ChatDetails,{foreignKey: 'ChatDetailsIdx',targetKey:'ChatDetailsIdx'})

/* 1: N ReplyType:ChoiceWords */
db.ReplyType.hasMany(db.ChoiceWords,{onDelete:'cascade',foreignKey: 'ReplyTypeIdx',sourceKey:'ReplyTypeIdx'})
db.ChoiceWords.belongsTo(db.ReplyType,{foreignKey: 'ReplyTypeIdx',targetKey:'ReplyTypeIdx'})

/* 1: N ChatDetails:ChoiceWords */
db.ChatDetails.hasMany(db.ChoiceWords,{onDelete:'cascade',foreignKey: 'ChatDetailsIdx',sourceKey:'ChatDetailsIdx'})
db.ChoiceWords.belongsTo(db.ChatDetails,{foreignKey: 'ChatDetailsIdx',targetKey:'ChatDetailsIdx'})

/* 1: N Reply:ReplyWords */
db.Reply.hasMany(db.ReplyWords,{onDelete:'cascade',foreignKey: 'ReplyIdx',sourceKey:'ReplyIdx'})
db.ReplyWords.belongsTo(db.Reply,{foreignKey: 'ReplyIdx',targetKey:'ReplyIdx'})

/* 1: N ChatDetails:Reply */
db.ChatDetails.hasMany(db.Reply,{onDelete:'cascade',foreignKey: 'ChatDetailsIdx',sourceKey:'ChatDetailsIdx'})
db.Reply.belongsTo(db.ChatDetails,{foreignKey: 'ChatDetailsIdx',targetKey:'ChatDetailsIdx'})

/* 1: 1 User:Letter */
db.User.hasOne(db.Letter,{onDelete:'cascade',foreignKey: 'UserIdx',sourceKey:'UserIdx'})
db.Letter.belongsTo(db.User,{foreignKey: 'UserIdx',targetKey:'UserIdx'})

/* 1: N Letter:LetterReceive */
db.Letter.hasMany(db.LetterReceive,{onDelete:'cascade',foreignKey: 'LetterIdx',sourceKey:'LetterIdx'})
db.LetterReceive.belongsTo(db.Letter,{foreignKey: 'LetterIdx',targetKey:'LetterIdx'})

/* 1: 1 User:LetterReceive */
db.User.hasOne(db.LetterReceive,{onDelete:'cascade',foreignKey: 'UserIdx',sourceKey:'UserIdx'})
db.LetterReceive.belongsTo(db.User,{foreignKey: 'UserIdx',targetKey:'UserIdx'})

/* 1: N User:BucketList */
db.User.hasMany(db.BucketList,{onDelete:'cascade',foreignKey: 'UserIdx',sourceKey:'UserIdx'})
db.BucketList.belongsTo(db.User,{foreignKey: 'UserIdx',targetKey:'UserIdx'})

module.exports = db;
