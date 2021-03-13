var express = require('express');
var router = express.Router();
const models = require('../models')	
const users = models.user;
const participant = models.participant;
const events = models.event;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
// const authMiddleware = (req, res, next) => {
//   if(req.isAuthenticated()) { // ログインしてるかチェック

//     next();

//   } else {

//     res.redirect(302, '/participant-login');

//   }
// };

/* GET home page. */
router.get('/', function(req, res) {
  const id = req.user.id;
  const attributes_user = ['name'];
  // const attributes_event =['id','title','description','thumbnail','capacity','url','category','entry_way','zipcode','prefecture','city','area','building','date','open_date','close_date','status','price','html'];
  // entry_way,company_name,text
  events.findAll({
    // attributes:attributes_event,
    order: [
      ['id', 'ASC']
    ],
    include:
    {model:users,attributes: attributes_user},
    raw:true
  }).then(data =>{
    users.findAll({
      where: {id: id},
      // attributes: ["last_name","first_name"]
      attributes: ["name"]
    }).then( username=>{
      var event_data ={
        avatar: req.user.avatar,
        name: req.user.name,
        data: data,
        search: ""
      }
      console.log(req.user);
      res.render('participant/san-event-search6',event_data)
    })
  })

});

router.post('/add_participant', function(req, res,next){
  
  const user_id = req.user.id;
    participant.create({
    user_id:user_id,
    canceled:false,
    created_at : new Date(),
    updated_at: new Date()

 }).then(participant =>{
     res.render('participant/san-event-search6')
 })
 
 router.post('/delete_participant',function(req,res,next){
   participant.findOne({
     
   }).then(user =>{
     participant.destroy();
   })
 })



})

router.post("/mypage",function(req,res){
  const id = req.user.id;
  const search = req.body.search;
  const attributes_user = ['name'];
  events.findAll({
    where: {
      title: {
        // サンプル
        [Op.like]: search+'%',
        [Op.like]: '%'+search,
        [Op.like]: '%'+search+'%',
      }
    },
    order: [
      ['id', 'ASC']
    ],
    include:
    {model:users,attributes: attributes_user},
    raw:true
  }).then(data =>{
    users.findAll({
      where: {id: id},
      attributes: ["name"]
    }).then( username=>{
      var event_data ={
        avatar: req.user.avatar,
        name: req.user.name,
        data: data,
        search: search,
      }
      res.render('participant/san-event-search6',event_data)
    })
  })
})

module.exports = router;