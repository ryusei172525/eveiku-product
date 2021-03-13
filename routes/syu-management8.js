var express = require('express');
var router = express.Router();
const models = require('../models')
const users = models.user;
const participant = models.participant;
const events = models.event;

const authMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) { // ログインしてるかチェック

    next();

  } else {

    res.redirect(302, '/login');

  }
};

/* GET home page. */
router.get('/', authMiddleware, function (req, res) {
  const id = req.user.id;
  const attributes_user = ['name', 'bio', 'age', 'gender', 'university', 'company', 'occupation', 'avatar'];
  const attributes_event = ['id', 'createdAt', 'updatedAt', 'title'];

  users.findOne({
    attributes: attributes_user,
    where: { id: id },
    include: [{
      model: events,
      attributes: attributes_event,
      required: false
    }],
  }).then(u => {
    var user = u.get({ plain: true })
    const event = user.events
    const data = {
      name: user.name,
      event: event,
    }
    console.log(data.name)
    res.render('organizer/syu-management8', data);
  })

});

const colors = require("colors")
router.post('/delete/:id', function (req, res) {
  var event_id = req.params.id
  console.log("id------------------------------".rainbow, event_id);
  events.findByPk(event_id)
    .then(event => {
      event.destroy();
    })
  res.redirect('/mypage');
})

router.get('/sample/:id', async function (req, res) {
  //paramsよりイベントid取得
  var event_id = req.params.id
  console.log(event_id)

  //participantテーブルよりイベントidと合致する参加者を取得
  participant.findAll({
    where: { event_id: event_id, form: "offline" },
    raw: true,
  }).then((e_offline) => {
    participant.findAll({
      where: { event_id: event_id, form: "online" },
      raw: true,
    }).then((e_online) => {
      var data_length_offline = e_offline.length;
      var data_length_online = e_online.length;
      var array_offline = [];
      var array_online = [];
      //配列arrayの中に参加者id(participant)を挿入
      for (let i = 0; i < data_length_offline; ++i) {
        array_offline.push(e_offline[i].user_id)
      }
      for (let i = 0; i < data_length_online; ++i) {
        array_online.push(e_online[i].user_id)
      }
      //usersテーブルよりarrayの中に入っているuser_idを基に該当userのデータを取ってくる
      const attributes_events_user = ['id', 'name', 'email', 'age', 'gender', 'university', 'company', 'occupation', 'avatar', 'birthday','industry'];
      users.findAll({
        attributes: attributes_events_user,
        where: { id: array_offline },
        raw: true,
      }).then((user_offline) => {
        users.findAll({
          attributes: attributes_events_user,
          where: { id: array_online },
          raw: true,
        }).then((user_online) => {
          const user_id = req.user.id;
          users.findOne({
            where: { id: user_id }
          }).then((user) => {
            var data = {
              content_offline: user_offline,
              content_online: user_online,
              id_offline: array_offline,
              id_online: array_online,
              avatar: user.avatar,
              name: user.name,
            }
            var stream_id_array = []
            var participant_name_array = []
            length_offline = array_offline.length;
            length_online = array_online.length;
            for (let i = 0; i < length_offline; i++) {
              let id_offline = data.id_offline[i]
              let mail_array_offline = data.content_offline[i].email.split('@', 1)
              let name_offline = data.content_offline[i].name;
              let mail_offline = mail_array_offline[0];
              stream_id_array.push(mail_offline + id_offline)
              participant_name_array.push(name_offline);
            }
            for (let i = 0; i < length_online; i++) {
              let id_online = data.id_online[i]
              let mail_array_online = data.content_online[i].email.split('@', 1)
              let name_online = data.content_online[i].name;
              let mail_online = mail_array_online[0];
              stream_id_array.push(mail_online + id_online)
              participant_name_array.push(name_online);
            }
            data.stream_id_array = stream_id_array;
            data.participant_name_array = participant_name_array;
            res.render('organizer/syu-management9', { data });
            const color = require('colors')
            console.log('=====start====='.rainbow)
            console.log(data.avatar);
            console.log('=====end====='.rainbow)
          })
        })

      })
    })
  })
});

module.exports = router;
