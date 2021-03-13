require('dotenv').config()
var AWS = require('aws-sdk');
const models = require('./models')	;
const users = models.user;
const events = models.event;
const participant = models.participant;
var cron = require('node-cron');

//crontab でmail.jsを一日1回呼び出す
//
/*
1 mysqlを直接呼び出し（イベントテーブル）、OO日前とイコールのデータを取り出す。
2 主催者の場合：usersテーブルから
3 user_idカラムを参考に
4 加者の場合：paticipantテーブル経由で
5 それぞれをarrayに挿入

メール申請も行う
crontabの設定も必要()
サンプルデータを入れる

今日やること
モジュールにしてindex.jsから呼び出すserver.start();的な感じで
つまり、メインスクリプトから呼び出せる感じで
メール申請
サンプルデータ
cronについて
sql_query修正
完成
*/
AWS.config.update({region: 'ap-northeast-1'});

var ses = new AWS.SES();
const Sequelize = require('sequelize');
const config = require('./config/config');
//env ファイルで環境管理
const sequelize = new Sequelize(config[process.env.NODE_ENV_MAIL]);
//create_atは本番で使う予定のdataカラムに値がないため代用
//sql_query内のsqlは、再度確認する必要がある>= も＝に変更する必要がある
// const sql_query = ' SELECT id,user_id FROM events';
//毎週月曜日の10時に実行される

// const schedule = cron.schedule('00 10 * * 1', () => {
//   // cron.schedule('*/3 * * * * *', () => {




// });

exports.aaa = () =>{
  const sql_query = ' SELECT id,user_id FROM events WHERE date <= NOW() + 5';

  sequelize.query(sql_query,{
      plain: false,
      type: sequelize.QueryTypes.SELECT,
      raw: false,
    })
    .then(data => {
    var id =[];
    var user_id =[];
    var length = data.length;
  
    for( var i=0; i<length; i++ ) {
     id.push(data[i].id);
     user_id.push(data[i].user_id);
    //  console.log(id)
    //  console.log(user_id)
     
  }
  return {id,user_id}
    })
  
  .then(u =>{
    console.log(u)
    //イベントモデルから
    events.findAll({
      where:{id:[u.id]},
          //サンプル
      // where:{id:[5,7,8,19]},
      attributes:['id','user_id'],
      include:[{
        model:users,
        attributes:['email']
      }],
      raw: true,
      // required: true
      nest: true 
    })
    .then(e =>{
      //メアド格納array
      var mail_add = []
        for( var i=0; i<e.length; i++ ) {
          mail_add.push(e[i].user.email)   
        }
  
      console.log(e[1].user.email)
      console.log(mail_add)
  
      //イベントモデルのメールアドレス
  
      //ユーザーモデルから
      users.findOne({
        // where:{id:u.user_id}
        where:{id:1},
        attributes:['email'],
        raw: true,
        // required: true
        nest: true 
    
      })
      .then(f =>{
        //user メールアドレス
        console.log(f.email)
        mail_add.push(f.email)
        console.log(mail_add)
        return mail_add
      })
      .then(u =>{
        console.log('以下のメールアドレス宛にメールを送ります。')
        console.log(u)
        var params = {
          Destination: {
            ToAddresses: u //user_mail
          },
          Message: {
            Body: {
              Text: {
                Data: 'お客様が予約されたイベントが近づいております',
                Charset: 'utf-8'
              }
            },
            Subject: {
              Data: 'イベントの件について',
              Charset: 'utf-8'
            }
          },
          Source: 'alart@eveiku.jp' // From ( holo-x mail )
        };
        
        ses.sendEmail(params, function(err, data) {
          if (err) console.log(err, err.stack); // an error occurred
          else     console.log(data);           // successful response
        });
       
      })      
    }) 
  })
};




