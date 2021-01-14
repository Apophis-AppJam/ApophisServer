# Apophis
### ☄️ 미리 맞이해보는 당신의 이른 죽음

*"죽음이라는 새로운 시각으로 과거의 삶을 바라보고, 회고하며 그를 통해 현재와 미래의 삶을 재구성한다."*



![KakaoTalk_Photo_2021-01-05-21-48-55](https://user-images.githubusercontent.com/61377122/103648239-e2e53a80-4f9f-11eb-998a-4f5f9034564c.jpeg)

> "지구 멸망 발표가 난 어느 말도 안되는 날, 아무 번호나 눌러 전화를 하게 된 아포니머스. 그리고 그걸 받은 당신. 다짜고짜 멸망까지의 7일을 함께 보내달라고 하더니, 심지어 이 7일 동안 짐을 싸서 당신에게로 가는 여행길에 오른다고 하는데."

[아포피스 노션 링크](https://www.notion.so/_Apophis-61bd57af215649dabdc371d26610ade2)

<br />



## 🗂 API 명세서

[API 명세서/진척도 바로가기](https://github.com/Apophis-AppJam/ApophisServer/wiki)

<br />



## Code Convention 

- git branch

```markdown
main
   |
   |--- dev
   |--- sehwa_dev
   |--- suzie_dev
```

- git commit rules

```markdown
[Add] 기능추가
[Delete] 삭제
[Update] 기능 수정
[Fix] 버그 수정
[Docs] 문서 정리
[Chore] 잡일
```

<br />

## ✔ Main Function

### 🗣 Interaction

- 아포니머스와의 채팅
- 익명의 누군가와 주고받는 편지


### 🎞 Record

- 사용자 자신에 대한 회고 기록
- 자신의 죽음을 가정하에 작성해보는 버킷 리스트

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
db.Letter = require('./letter.js')(sequelize, Sequelize);
db.LetterReceive = require('./letterReceive.js')(sequelize, Sequelize);
db.BucketList = require('./bucketList.js')(sequelize, Sequelize);

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


```

<br />

## 📋 ERD
<img width="609" alt="Screen Shot 2021-01-14 at 11 19 37 PM" src="https://user-images.githubusercontent.com/46921003/104602929-3bfb4f80-56bf-11eb-9d51-ca4364e1ff9b.png">

<br />



## Architecture





<br />

##  Apophis Server

| 류세화                                                       | 이수진                                                       |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| <img width="300" alt="Screen Shot 2021-01-06 at 1 33 07 PM" src="https://user-images.githubusercontent.com/46921003/103729422-bffc6a00-5023-11eb-84d2-9733d9791b66.png"> | <img width="320" alt="Screen Shot 2021-01-14 at 11 25 48 PM" src="https://user-images.githubusercontent.com/46921003/104603526-db204700-56bf-11eb-9969-bc06e5db9aa4.png"> |
| - rdb 설계<br /> - 배포환경 구축<br /> - 대화창 선택지 상세 조회<br /> - 아포니머스와 사용자의 일차별 채팅 전체 조회<br />- 익명의 누군가와 주고받는 편지 | - rdb 설계<br /> - 배포환경 구축<br />- 아포니머스 채팅 조회 <br /> - 사용자 대답 입력<br />- 버킷리스트 관리 |

