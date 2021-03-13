var express = require('express');
var router = express.Router();
const model = require("../models");
const fs = require('fs');
const AWS = require('aws-sdk');
const multer = require('multer');
const upload = multer({ dest: 'uploads-icon/' });
const images = model.images;

router.get("/", function (req, res) {
  const id = req.user.id;
  images.findAll({
    where: { user_id: id },
    attribute: ["image"]
  }).then(img => {
    res.render("upload-img", { img: img });
  })
});

router.post("/", upload.single('image'), function (req, res) {
  const color = require('colors')
  console.log('=====start====='.rainbow)
  console.log(req.file)
  console.log('=====end====='.rainbow)
  const id = req.user.id;
  const ID = 'AKIAJVYTNUXNYUPZSPKQ';
  const SECRET = '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';
  const BUCKET_NAME = 'eveiku-test1';
  const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
  });
  images.count(
    { where: { user_id: [id] } }
  ).then(dataCount => {
    const num = dataCount + 1;
    const uploadFile = (fileName) => {
      const fileContent = fs.readFileSync(fileName);
      const params = {
        Bucket: BUCKET_NAME,
        Key: "event-img/" + 'event-' + id + "-" + num + ".jpg",
        Body: fileContent
      };
      s3.upload(params, function (err, data) {
        if (err) {
          throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
        images.create(
          {
            image: data.Location,
            userId: id,
            counter: num,
          },
        ).then(() => {
          let img_del = req.file.path.slice(13);
          fs.unlinkSync("uploads-icon/" + img_del);
          res.header("Content-Type", "text/plain;charset=utf-8");
          res.end(JSON.stringify({ img: data.Location }));
          // res.redirect("/upload-img");
        })
      });
    };
    if (req.file != undefined) {
      uploadFile(req.file.path);
    }
  });
})

router.post("/:id", function (req, res) {
  // res.redirect("/upload-img");
  const id = req.user.id;
  images.findAll({
    where: {
      user_id: id,
      counter: req.params.id
    },
  }).then(image_path => {
    console.log(image_path[0]["image"]);
    res.redirect("/upload-img");
  })
})

module.exports = router;