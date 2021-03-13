var express = require('express');
var router = express.Router();
const model = require("../models");
const users = model.user;
const event = model.event;
const participant = model.participant;

const colors = require("colors")
/* GET users listing. */
router.post('/', function(req, res, next) {
    var participate_user_id = req.body.paraticipate_id;
    console.log("araaaaaaaaaaaaaaaagdddddddddddddddddddddddddd".rainbow, req.query)
    users.findOne({
        where: {id: participate_user_id}
    }).then(participate_user => {
        console.log("sssssssssssssssssssssssss".rainbow, participate_user.id);
        event.findAll({
            where: {user_id: participate_user.id} // 参加者が主催しているイベントを検索
        }).then(participates_event =>{
            console.log("ssoooooooooooooooooooooooooooooooooooooooooooaewvs".rainbow ,participates_event);
            participant.findAll({
                where: {user_id: participate_user.id} // 参加者が参加しているイベントを検索
            }).then(event_log_id => {
                console.log("ssssllllllllllllllllllllllllllllllllllllllllls".rainbow, event_log_id[0].event_id);
                for(var i=0; i <= event_log_id.length; i++) {
                    event.findAll({
                        where: { id: event_log_id[i].event_id }
                    }).then(participant_event_ids => {
                        let participant_data = {
                            participate_user: participate_user, // 参加者の情報
                            participates_event: participates_event, // 参加者が開催しているイベント
                            participant_event_ids: participant_event_ids // 参加者が参加しているイベント
                        }
                        
                        res.render('../views/user-profile', participant_data);
                    })
                }
                
            })
        })
    })

    // let participant_data = {
    //     participate_user: participate_user, // 参加者の情報
    //     participates_event: participates_event, // 参加者が開催しているイベント
    //     participant_event_ids: participant_event_ids // 参加者が参加しているイベント
    // }
    
});

module.exports = router;
