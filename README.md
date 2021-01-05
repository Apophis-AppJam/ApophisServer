# Apophis
### ☄️ 미리 맞이해보는 당신의 이른 죽음

*"죽음이라는 새로운 시각으로 과거의 삶을 바라보고, 회고하며 그를 통해 현재와 미래의 삶을 재구성한다."*



![KakaoTalk_Photo_2021-01-05-21-48-55](https://user-images.githubusercontent.com/61377122/103648239-e2e53a80-4f9f-11eb-998a-4f5f9034564c.jpeg)

> "지구 멸망 발표가 난 어느 말도 안되는 날, 아무 번호나 눌러 전화를 하게 된 아포니머스. 그리고 그걸 받은 당신. 다짜고짜 멸망까지의 7일을 함께 보내달라고 하더니, 심지어 이 7일 동안 짐을 싸서 당신에게로 가는 여행길에 오른다고 하는데."

<br />

## 🗂 API 명세서


[WIKI API 명세서 바로가기](https://github.com/Apophis-AppJam/ApophisServer/wiki)

<br />

## 📖 Dependencies  Module
![dependencies](https://user-images.githubusercontent.com/61377122/103629809-216cfc00-4f84-11eb-842d-f8f6f900545b.png)


<br />

## ⚙️ Models
```javascript

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
db.ChatDetails.hasMany(db.ChoiceWords,{onDelete:'cascade',foreignKey: 'ChatDetailsIdx',sourceKey:'ChatDetailsIdx'})
db.ChoiceWords.belongsTo(db.ChatDetails,{foreignKey: 'ChatDetailsIdx',targetKey:'ChatDetailsIdx'})

/* 1: N Reply:ReplyWords */
db.Reply.hasMany(db.ReplyWords,{onDelete:'cascade',foreignKey: 'ReplyIdx',sourceKey:'ReplyIdx'})
db.ReplyWords.belongsTo(db.Reply,{foreignKey: 'ReplyIdx',targetKey:'ReplyIdx'})

/* 1: N ChatDetails:Reply */
db.ChatDetails.hasMany(db.Reply,{onDelete:'cascade',foreignKey: 'ChatDetailsIdx',sourceKey:'ChatDetailsIdx'})
db.Reply.belongsTo(db.ChatDetails,{foreignKey: 'ChatDetailsIdx',targetKey:'ChatDetailsIdx'})

```

<br />

## 📋 ERD
![ERD](https://user-images.githubusercontent.com/61377122/103629784-1914c100-4f84-11eb-8e79-81bb0892cac3.png)

<br />

## ✔ Main Function

### 🗣 Interaction

- 아포니머스와의 채팅
- 익명의 누군가와 주고받는 편지


### 🎞 Record

- 사용자 자신에 대한 회고 기록
- 자신의 죽음을 가정하에 작성하는 버킷 리스트


<br />

##  Apophis Server

| 류세화                      | 이수진                      |
| --------------------------- | --------------------------- |
| <img width="1500" alt="KakaoTalk_Photo_2021-01-05-21-38-54" src="https://user-images.githubusercontent.com/61377122/103647333-7cabe800-4f9e-11eb-975c-45155e687b4f.png">| ![image](https://user-images.githubusercontent.com/61377122/103647854-47ec6080-4f9f-11eb-8615-0bb289f5fd07.png)|
| - rdb 설계<br /> - 배포환경 구축<br /> - 대화창 선택지 상세 조회<br /> - 아포니머스와 사용자의 일차별 채팅 전체 조회 | - rdb 설계<br /> - 배포환경 구축<br />	- 아포니머스 채팅 조회 <br /> - 사용자 대답 입력|

