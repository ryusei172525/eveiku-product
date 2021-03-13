var express = require('express');
var router = express.Router();
const models = require('../models')	
const participant = models.participant;
const events = models.event;
let event_Id = require("../app")

const authMiddleware = (req, res, next) => {
    if(req.isAuthenticated()) { // ログインしてるかチェック

      next();

    } else {

      res.redirect(302, '/login-event');
    }
};

var event_data = {};

router.get('/',authMiddleware,function(req,res){
  if (event_Id.eventid != undefined) {
    event_id = event_Id.eventid;
  }
  console.log(event_id);
  events.findAll({
    where: {id: event_id},
    attributes: ["url","title","date","description","organizer","city","price","online_price","online_url","capacity","online_capacity"]
  }).then( url =>{
    event_data = {
      title: url[0]["title"],
      date: url[0]["date"],
      description: url[0]["description"],
      organizer: url[0]["organizer"],
      city: url[0]["city"],
      capacity: url[0]["capacity"],
      price: url[0]["price"],
      online_price: url[0]["online_price"],
      online_url: url[0]["online_url"],
      online_capacity: url[0]["online_capacity"],
      name: req.user.name,
    }
    res.render('../views/participant/verify.ejs',event_data);
  })
})

router.post('/:id',function(req,res){
  let event_id = req.params.id;
  console.log("event_id",event_id);
  events.findAll({
    where: {id: event_id},
    attributes: ["url","title","date"]
  }).then( url =>{
    res.redirect("/public/"+url[0]["url"]);
    event_data = {
      title: url[0]["title"],
      date: url[0]["date"],
      name: req.user.name,
    }
    router.get('/',authMiddleware,function(req,res){
      res.render('../views/participant/verify.ejs',event_data);
    })
  })
});


const colors = require("colors");
router.post("/offline-ticket",function(req,res){
  // if (event_Id.eventid != undefined) {
  //   event_id = event_Id.eventid;
  // }
  console.log("oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo");
})



module.exports = router; 