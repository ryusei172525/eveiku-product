var colors = require('colors');

var express = require('express');
var router = express.Router();
const models = require('../models')
const users = models.user;
const participant = models.participant;
const events = models.event;
var event_id;
let event_Id = require("../app");
// const { where } = require('sequelize/types');
router.post('/event/:id', function (req, res) {
  event_id = req.params.id;
  events.findAll({
    where: { id: event_id },
    attributes: ["url"]
  }).then(url => {
    // res.render('../views/participant/verify-off.ejs');
    res.redirect("/public/" + url[0]["url"]);
  })
});
/* GET home page. */
router.get('/offline', function (req, res, next) {
  if (event_Id.eventid != undefined) {
    event_id = event_Id.eventid;
  }
  console.log("event_id".rainbow, event_id);
  console.log("event_Id.eventid".rainbow, event_Id.eventid);
  const user_id = req.user["id"];
  events.findAll({
    where: { id: event_id },
    attributes: ["capacity"]
  }).then(capacity => {
    console.log("capacity", capacity)
    participant.findAll({
      where: { 
        event_id: event_id,
        form: "offline"
      }
    }).then(participants => {
      let participant_length = participants.length;
      if (capacity[0]["capacity"] > participant_length) {
        var offline = "offline";
        participant.findOrCreate({
          where: {
            userId: user_id,
            eventId: event_id
          },
          defaults: {
            userId: user_id,
            eventId: event_id,
            canceled: false,
            form: offline,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        }).then(([user, created]) => {
          events.findAll({
            where: { id: event_id },
            // attributes: ['id','title','description','thumbnail','capacity','url','category','entry_way','zipcode','prefecture','city','area','building','date','open_date','close_date','status','price','html'],
            raw: true
          }).then(datas => {
            if (created) {
              const id = req.user.id;
              users.findAll({
                where: { id: id },
                attributes: ["name"]
              }).then(username => {
                console.log(username)
                var data = {
                  // name: users.name,
                  // name: username[0]["name"],
                  // last_name: username[0]["last_name"],
                  // first_name: username[0]["first_name"],
                  data: datas,
                };
                res.render('ticket', data);
              })
            } else {
              res.redirect("/already");
            }
          });
        })
      } else {
        res.redirect("/limit");
      }
    })
  })
});


router.get('/online', function (req, res, next) {
  if (event_Id.eventid != undefined) {
    event_id = event_Id.eventid;
  }
  console.log("event_id".rainbow, event_id);
  console.log("event_Id.eventid".rainbow, event_Id.eventid);
  const user_id = req.user["id"];
  events.findAll({
    where: { id: event_id },
    attributes: ["online_capacity"]
  }).then(capacity_online => {
    console.log("capacity", capacity_online)
    participant.findAll({
      where: { 
        event_id: event_id,
        form: "online"
      }
    }).then(online_participants => {
      let online_participant_length = online_participants.length;
      if (capacity_online[0]["online_capacity"] > online_participant_length) {
        var online = "online";
        participant.findOrCreate({
          where: {
            userId: user_id,
            eventId: event_id
          },
          defaults: {
            userId: user_id,
            eventId: event_id,
            canceled: false,
            form: online,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        }).then(([user, created]) => {
          events.findAll({
            where: { id: event_id },
            // attributes: ['id','title','description','thumbnail','capacity','url','category','entry_way','zipcode','prefecture','city','area','building','date','open_date','close_date','status','price','html'],
            raw: true
          }).then(datas => {
            if (created) {
              const id = req.user.id;
              users.findAll({
                where: { id: id },
                attributes: ["name"]
              }).then(username => {
                console.log(username)
                var data = {
                  // name: users.name,
                  // name: username[0]["name"],
                  // last_name: username[0]["last_name"],
                  // first_name: username[0]["first_name"],
                  data: datas,
                };
                res.render('ticket', data);
              })
            } else {
              res.redirect("/already");
            }
          });
        })
      } else {
        res.redirect("/limit");
      }
    })
  })
});

module.exports = router;