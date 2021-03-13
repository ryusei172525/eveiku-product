var express = require("express");
var router = express.Router();
const model = require("../models");
const users = model.user;
const event = model.event;
const participant = model.participant;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const authMiddleware = (req, res, next) => {
  if(req.isAuthenticated()) { // ログインしてるかチェック

    next();

  } else {

    res.redirect(302, '/login');

  }
};
router.get("/",authMiddleware, function (req, res) {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    const id = req.user.id;
    users.findAll({
      where: { id: id },
    }).then(users2 => {
      const user = users2;
      event.findAll({
        where: { user_id: id }
      }).then(user_events => {
        const my_event = user_events;
        participant.findAll({
          where: { user_id: id },
          attributes: ["event_id"],
          include: { model: users, attributes: ["id"] },
          raw: true
        }).then(eventid => {
          const event_data = [];
          for (var i = 0; i < eventid.length; i++) {
            event_data.push(eventid[i]["event_id"]);
          }
          event.findAll({
            where: { id: { [Op.in]: event_data } },
            include: { model: users, attributes: ["id","name","email"] },
            raw: true
          }).then(item => {
            const join_event = item
            const event_id_array = [];
            const user_name = [];
            const user_mail_array = [];
            for (var i = 0; i < item.length; i++) {
              event_id_array.push(item[i]["id"]);
              user_name.push(item[i]['user.name']);
              user_mail_array.push(item[i]["user.email"]);
            }
            event.findAll({
              where: {id : event_data},
              attributes: ["user_id"],
              include:{ model: users, attributes: ["id","name","email"] }
            }).then((results) => {
              const user_id_array = [];
              for (var i = 0; i < results.length; i++) {
                user_id_array.push(results[i].user_id);
              }
              let data = {
                user_name: user_name,
                user_id: user_id_array,
                user_mail: user_mail_array,
                bio: user[0].bio,
                name: user[0].name,
                email: user[0].email,
                gender: user[0].gender,
                occupation: user[0].occupation,
                industry: user[0].industry,
                company: user[0].company,
                university: user[0].university,
                birthday: user[0].birthday,
                avatar: user[0].avatar,
                my_event: my_event,
                join_event: join_event,
              }
               //usersテーブルよりarrayの中に入っているuser_idを基に該当userのデータを取ってくる
               const attributes_events_user = ['name', 'email', 'age', 'gender', 'university', 'company', 'occupation'];
               users.findAll({
                 attributes: attributes_events_user,
                 where: { id: user_id_array },
                 raw: true,
               }).then((user) => {
                 data.content = user;
                 data.id = user_id_array;
                 var stream_id_array = []
                 var participant_name_array = []
                 length = user.length;
                 console.log(length);
                 for (let i = 0; i < length; i++) {
                   let id = data.id[i]
                   let mail_array = data.content[i].email.split('@', 1)
                   let name = data.content[i].name;
                   let mail = mail_array[0];
                   stream_id_array.push(mail + id)
                   participant_name_array.push(name);
                 }
                 data.stream_id_array = stream_id_array;
                 data.participant_name_array = participant_name_array;
                 console.log(data.stream_id_array);
                 console.log(data.participant_name_array);
                 // console.log(data);
                 res.render("myEvent", { data });
               })
             })

             // console.log("あああああああああああああああああああああ",data.join_event[2]["title"]);
           })
         })
       })
       
     })
  });
  
// イベント参加取り消し
router.post('/cancel/:id', function (req, res) {
  var cancel_event_id = req.body.event_id;
  var user_id = req.user.id;
  event.findByPk(cancel_event_id)
    .then(cancel_event => {
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaa-------------".rainbow, cancel_event.id);
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaa-------------".rainbow, user_id);
      console.log("bbbbbbbbbbbbbbbbbbbbbbbbb-------------".rainbow, cancel_event.user_id);
      participant.findOne({ where: { 
        user_id: user_id, 
        event_id: cancel_event.id }}
      ).then( real_cancel_event => {
        console.log("ccccccccccccccccccccccc-------------".rainbow, real_cancel_event);
        real_cancel_event.destroy();
      })
    })
  res.redirect('/myEvent');
  window.location.reload();
})


module.exports = router;