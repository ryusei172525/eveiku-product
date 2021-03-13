var express = require('express');
const app = express();
var router = express.Router();
const models = require('../models')	
const users = models.user;
const participant = models.participant;
const events = models.event;

const StreamChat = require('stream-chat').StreamChat;
const { response } = require('express');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const colors = require("colors")
// const serverClient = new StreamChat('en9f3nkqxzad', 'zqnvsczy8uttnj8k762sppxg3sg6pm5fvqujfv7rhucp4rwfbsvyvnyg7jtxeyb2');
const serverClient = new StreamChat('rhuph3ha9crr', 'd7kufzpkbzx4f2vca88yyu2mhw76dexbhe5n3znr8mkpfwk8dpbzt3ze4pub4qqh');

router.get('/',function(req,res){
  id = req.user.id;
  participant_id=req.query.id;
  participant_name=req.query.name;
  participant_email=req.query.mail.split('@',1);
  // 参加者名+ 参加者のIDを全取得
  stream_id_array=req.query.stream_id_array;
  // 参加者名全取得
  participant_name_array=req.query.participant_name_array;
  console.log(participant_id);
  console.log(participant_name);
  console.log(participant_email);
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa".rainbow, stream_id_array);
  console.log(participant_name_array);
  participant_name_array2 = [];
  participant_name_array2 = participant_name_array.split(',');
  const participant_icon_src_array = [];
  users.findAll({
    where: {name: participant_name_array2},
    attributes: ["avatar"]
  }).then((icon) =>{
    console.log(icon);
    for(var i = 0;i<icon.length;i++){
      participant_icon_src_array.push(icon[i].avatar);
    }
    const attributes_user = ['id','name',"age","gender","university","occupation","company","bio","email"];
  const attributes_paticipant = ['id',"event_id"];

  const participant_mail=['']
  users.findAll({
    where:{id:id},
    attributes:attributes_user,
    include:
    {model:participant,attributes:attributes_paticipant},
    raw:true
  }).then( data =>{
    // ログインしている自分の情報を定義(reqで良さそう)
    var Data = {
      avatar: req.user.avatar,
     name:data[0].name,
     age:data[0].age,
     gender:data[0].gender,
     university:data[0].university,
     occupation:data[0].occupation,
     company:data[0].company,
     bio:data[0].bio,
     participant:data,
     event:events,
     email:data[0].email
    }
    // 自分のメアドの@マークを消して取得
    var user_mail=Data.email.split('@',1);
    // DBにある自分のIDにメアドをくっつけて定義(idが先で良いのか???)
    // user_id_mail=(id+user_mail);
    user_id_mail=(user_mail + id);
    // トークン作成
    var token=serverClient.createToken(user_id_mail);
    // 参加者のメアド+参加者のID(user_id_mailと何故か形が違う)
    participant_id_mail=(participant_email+participant_id);
    console.log(participant_id_mail);
    // 参加者のトークン作成
    var participant_token=serverClient.createToken(participant_id_mail);
    // 参加者のデータを改めて定義
    var participant_data={
      participant_name:participant_name,
      participant_token:participant_token,
      participant_id_mail:participant_id_mail,
      stream_id_array:stream_id_array,
      participant_name_array:participant_name_array,
      participant_icon_src_array:participant_icon_src_array,
    };
    
    var Datas={
      Data:Data, // ログインしている自分のデータ
      token:token, // ログインしている自分のトークン
      user_id_mail: user_id_mail,
      //user_id_mail:user_id_mail, // ログインしている自分のIDにメアドをくっつけたもの
      participant_data:participant_data // 参加者のデータ
    }
    // ユーザ情報の更新
    updateuser();
    
      
    // トークンを作って、自分と参加者のデータを作っているだけ!(message.js)
    res.render('message', Datas)
  });
  })
});


function updateuser(){
  const updateResponse =serverClient.upsertUsers([ 
    { id: user_id_mail}, 
    { id: participant_id_mail}
  ]);
  return updateResponse;
}

module.exports = router;