var express = require('express');
var router = express.Router();
const models = require('../models')	
const users = models.user;
const participant = models.participant;
const events = models.event;
var event_id;
let event_Id = require("../app");

// router.post('/:id',function(req,res){

// })

router.get('/:id',function(req,res){
    event_id = req.params.id;
    events.findAll({
        where: {id: event_id},
        // attributes: ['id','title','description','thumbnail','capacity','url','category','entry_way','zipcode','prefecture','city','area','building','date','open_date','close_date','status','price','html'],
        raw:true
    }).then(data =>{
        users.findOne({where: {id: data[0]["user_id"]}
        }).then(createUser => {
            console.log(createUser.email);
            console.log("aaaaaaaaaaaaaaa",data[0]["user_id"]);
            res.render('ticket',{data});
        })
    });
});

module.exports = router; 