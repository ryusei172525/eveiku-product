var express = require("express");
var router = express.Router();
const model = require("../models");
const users = model.user;
const event = model.event;
const participant = model.participant;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get("/", function (req, res) {
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
        console.log(eventid);
        const event_data = [];
        for (var i = 0; i < eventid.length; i++) {
          event_data.push(eventid[i]["event_id"]);
        }
        event.findAll({
          where: { id: { [Op.in]: event_data } },
          raw: true
        }).then(item => {
          const join_event = item
          let data = {
            bio: user[0].bio,
            name: user[0].name,
            email: user[0].email,
            gender: user[0].gender,
            occupation: user[0].occupation,
            industry: user[0].industry,
            company: user[0].company,
            university: user[0].university,
            bio: user[0].bio,
            birthday: user[0].birthday,
            avatar: user[0].avatar,
            my_event: my_event,
            join_event: join_event,
          }

          res.render("home", { data });
        })
      })

    })
  })
});

module.exports = router;