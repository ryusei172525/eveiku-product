var express = require("express");
var router = express.Router();
const model = require("../models");
const users = model.user;
const images = model.images;

const { v4: uuidv4 } = require("uuid");
const { EmptyResultError } = require("sequelize");
const Event = model.event;
const Tag = model.tag;
const EventsTag = model.events_tag;
const Template = model.template;

var path = require("path");
const authMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    // ログインしてるかチェック
    next();
  } else {
    res.redirect(302, "/login");
  }
};

// 下書きを作成
const createDraftDatabase = async (req) => {
  const url = req.body.url ? req.body.url : uuidv4();
  const event = await Event.create({
    user_id: req.user.id,
    draft_title: req.body.title,
    draft_description: req.body.description,
    draft_organizer: req.body.organizer,
    draft_html: req.body.html,
    draft_url: url,
    draft_date: req.body.date,
    draft_price: req.body.price,
    draft_capacity: req.body.capacity,
    draft_thumbnail: findThumbnail(req.body.html),
    draft_online_capacity: req.body.onlineCapacity,
    draft_online_url: req.body.onlineUrl,
    draft_online_price: req.body.onlinePrice,
    draft_city: req.body.place,
    draft_entry_way: req.body.participationForm,
    draft_category: req.body.attribute,
  });
  return event;
}

// 下書きを上書き保存
const saveDraftDatabase = async (eventId, req, res) => {
  const event = await Event.findByPk(eventId);
  if (event.user_id !== req.user.id) res.redirect(302, "/organizer-login");
  event.draft_html = req.body.html;
  event.draft_price = req.body.price;
  event.draft_capacity = req.body.capacity;
  event.draft_city = req.body.place;
  event.draft_entry_way = req.body.participationForm;
  event.draft_category = req.body.attribute;
  event.draft_thumbnail = findThumbnail(req.body.html);
  event.draft_online_url = req.body.onlineUrl;
  event.draft_online_price = req.body.onlinePrice;
  event.draft_online_capacity = req.body.onlineCapacity;

  event.draft_title = req.body.title;
  event.draft_description = req.body.description;
  event.draft_organizer = req.body.organizer;
  event.draft_url = req.body.url;
  event.draft_date = req.body.date;
  await event.save();
  return event;
}

// サムネイル画像を探す
const findThumbnail = (data) => {

  const html_json_data = JSON.parse(data.json).dataTypeArr;
  let thumbnail = "";
  for (i of html_json_data) {
    if (i.blockType == 'topViewLayout') {
      thumbnail = i.imageArr[0];
    }
  }
  const color = require('colors')
  console.log('=====start====='.rainbow)
  console.log(thumbnail)
  console.log('=====end====='.rainbow)
  return thumbnail == "" ? "" : thumbnail;
};
// ハッシュタグを作成
const createHashtag = async (req, eventId) => {
  await EventsTag.destroy({
    where: {
      event_id: eventId
    }
  })
  const tagArr = req.body.hashtag.split(" ");
  for (const i of tagArr) {
    Tag.findOrCreate({
      where: { name: i },
      defaults: {
        name: i,
      }
    }).then(([tag]) => {
      EventsTag.create({
        event_id: eventId,
        tag_id: tag.id,
      })
    });
  }
}



/* GET home page. */
router.get("/", authMiddleware, async function (req, res, next) {
  var data = {
    avatar: req.user.avatar,
    name: req.user.name,
    age: req.user.age,
    university: req.user.university,
    occupation: req.user.occupation,
    company: req.user.company,
    occupation: req.user.occupation,
    bio: req.user.bio,
    image: images,
  };
  res.render("organizer/build-page", data);
});

const response = {}

router.get("/data", authMiddleware, function (req, res, next) {
  res.header("Content-Type", "text/plain;charset=utf-8");
  res.end(JSON.stringify({ html: response }));
});

router.get("/data/:id", authMiddleware, async function (req, res, next) {
  const id = req.params.id;
  const event = await Event.findByPk(id);
  const html = JSON.parse(event.draft_html.json)

  // 日付処理
  const draft_date = event.draft_date;
  const optimize_date = draft_date.toLocaleDateString().replaceAll("/", "-");

  // ハッシュタグ処理
  let tag_list = ""
  const tags = await EventsTag.findAll({ where: { event_id: id } });
  await Promise.all(tags.map(async (tag) => {
    const hashtag = await Tag.findByPk(tag.tag_id);
    tag_list += hashtag.name + " ";
  }))

  let response_publicOption = JSON.parse(JSON.stringify({
    title: event.draft_title,
    description: event.draft_description,
    organizer: event.draft_organizer,
    url: event.draft_url,
    attribute: event.draft_entry_way,
    participationForm: event.draft_entry_way,
    hashtag: tag_list,
    date: optimize_date,
    price: event.draft_price,
    place: event.draft_city,
    capacity: event.draft_capacity,

    onlinePrice: event.draft_online_price,
    onlineUrl: event.draft_online_url,
    onlineCapacity: event.draft_online_capacity,

    applicants: ""
  }))

  const html_json = JSON.stringify(html.dataTypeArr);

  res.header("Content-Type", "text/plain;charset=utf-8");
  res.end(JSON.stringify({ html: html_json, publicOption: response_publicOption }));
});

router.get(
  "/data/template/:id",
  authMiddleware,
  async function (req, res, next) {
    const template = await Template.findByPk(req.params.id);
    const html = JSON.parse(JSON.stringify(template.html));
    res.header("Content-Type", "text/plain;charset=utf-8");
    res.end(JSON.stringify({ html: html }));
  }
);

// 初回公開時実行
router.post("/test", authMiddleware, async function (req, res, next) {

  let urlCheck = ""
  if (req.body.url) {
    const isUrl = await Event.findOne({ where: { url: req.body.url } })
    if (isUrl && isUrl.id != req.params.id) urlCheck = "ERROR";
  };

  url = (req.body.url != "") ? req.body.url : uuidv4();
  req.body.url = url;

  const event = await Event.create({
    user_id: req.user.id,
    title: req.body.title,
    description: req.body.description,
    organizer: req.body.organizer,
    html: req.body.html,
    url: req.body.url,
    date: req.body.date,
    price: req.body.price,
    capacity: req.body.capacity,
    city: req.body.place,
    thumbnail: findThumbnail(req.body.html),
    online_price: req.body.onlinePrice,
    online_capacity: req.body.onlineCapacity,
    online_url: req.body.onlineUrl,

    entry_way: req.body.participationForm,
    category: req.body.attribute,
  });


  saveDraftDatabase(event.id, req, res)
  createHashtag(req, event.id);

  urlCheck = (urlCheck != "ERROR") ? event.url : urlCheck;

  res.header("Content-Type", "text/plain;charset=utf-8");
  res.end(
    // 本番用
    JSON.stringify({ url: "/public/" + urlCheck, event_id: event.id })

    // ローカル
    // JSON.stringify({ url: "localhost:3000/public/" + urlCheck, event_id: event.id })
  );
});

// イベント編集後=>公開時実行
router.post("/test/:id", authMiddleware, async function (req, res, next) {

  let url = ""
  if (req.body.url) {
    const isUrl = await Event.findOne({ where: { url: req.body.url } })
    if (isUrl && isUrl.id != req.params.id) url = "ERROR";
  };
  url = (req.body.url != "") ? req.body.url : uuidv4();

  req.body.url = url;

  const event = await Event.findByPk(req.params.id);
  const user = req.user;
  if (event.user_id !== user.id) res.redirect(302, "/organizer-login");
  event.html = req.body.html;
  event.price = req.body.price;
  event.capacity = req.body.capacity;
  event.city = req.body.place;
  event.thumbnail = findThumbnail(req.body.html);

  event.online_url = req.body.onlineUrl;
  event.online_price = req.body.onlinePrice;
  event.online_capacity = req.body.onlineCapacity;

  event.entry_way = req.body.participationForm;
  event.category = req.body.attribute;
  event.title = req.body.title;
  event.description = req.body.description;
  event.organizer = req.body.organizer;
  event.url = req.body.url;
  event.date = req.body.date;
  await event.save();

  saveDraftDatabase(event.id, req, res);
  createHashtag(req, event.id);

  url = (url != "ERROR") ? event.url : url;

  res.header("Content-Type", "text/plain;charset=utf-8");
  res.end(
    // 本番用
    JSON.stringify({ url: "/public/" + url, event_id: event.id })

    // ローカル
    // JSON.stringify({ url: "localhost:3000/public/" + url, event_id: event.id })
  );
});


router.post("/draft", authMiddleware, async function (req, res, next) {

  const event = await createDraftDatabase(req);
  createHashtag(req, event.id);
  res.header("Content-Type", "text/plain;charset=utf-8");
  res.end(
    JSON.stringify({ url: "DRAFTSAVE", event_id: event.id })
  );
});

router.post("/draft/:id", authMiddleware, async function (req, res, next) {
  saveDraftDatabase(req.params.id, req, res)
  createHashtag(req, req.params.id);

  res.header("Content-Type", "text/plain;charset=utf-8");
  res.end(
    JSON.stringify({ url: "DRAFTSAVE", event_id: req.params.id })
  );
})

module.exports = router;