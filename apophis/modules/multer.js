const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
aws.config.loadFromPath(__dirname+'/../config/s3.json');
const s3 = new aws.S3();
var path = require('path')

const upload = multer({
    storage: multerS3({
        s3,
        bucket: 'apophis',
        acl: 'public-read',
        key: function (req, file, cb) {
            var ext = path.extname(file.originalname);
            if(ext == '.png' || ext == '.jpg' || ext == '.gif' || ext == '.jpeg') {
                cb(null, 'image/origin/' + Date.now() + '.' + file.originalname.split('.').pop());
                console.log("이미지로 인식")
            } else {
                cb(null, 'audio/origin/' + Date.now() + '.' + file.originalname.split('.').pop());
                console.log("오디오로 인식")
            }
        }

    })
});

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "/uploads");
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + "-" + Date.now());
//     },
//   });


module.exports=upload;