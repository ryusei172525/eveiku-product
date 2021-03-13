var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const passport = require("./auth");
const session = require("express-session");
const flash = require("connect-flash");
const bcrypt = require("bcryptjs");
const dotenv = require('dotenv').config();
const env = process.env;
var cron = require('node-cron');

var message_Router = require("./routes/message.js");
var build_page_Router = require("./routes/build-page.js");
var management_Router = require("./routes/syu-management8.js");
var public_Router = require("./routes/public.js");
var search_event_Router = require("./routes/san-event-search6.js");

// 事前登録
var pre_register_top_Router = require("./routes/pre-register/top.js");
var pre_register_complete_Router = require("./routes/pre-register/complete.js");
var pre_register_screen_Router = require("./routes/pre-register/screen.js");

// プロフィール表示
var user_profile_Router = require('./routes/user-profile.js');

// 以下新規
var home_Router = require('./routes/home'); // ホーム表示
var holdEvent_Router = require('./routes/holdEvent');
var myEvent_Router = require('./routes/myEvent'); // 参加イベント表示
var myAccount_Router = require('./routes/myAccount'); // アカウント設定表示
var preview_Router = require('./routes/preview');
var already_Router = require('./routes/already');
var limit_Router = require('./routes/limit');
var chart_Router = require('./routes/chart');

var app = express();

// const users = []
const models = require("./models");
const users = models.user;


// ログインのミドルウェア

// ミドルウェア


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(
  session({
    secret: "YOUR-SECRET-STRING",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// var a = require('./a.js');
const mail = require('./mail.js');
// app.use(schedule);
cron.schedule('00 10 * * 1', mail.aaa);

// 各ページでのログインチェック
const authMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    // ログインしてるかチェック

    next();
  } else {
    res.redirect(302, "/login");
  }
};

// イベントに参加クリック時に、アカウントがない人に向けた新規登録
app.post("/participant-register-event", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.create({
      email: req.body.email,
      password: hashedPassword,
    });
    res.redirect("/login");
  } catch {
    console.log(req.body.email);
    res.redirect("/login");
  }
});

const event = models.event;
const images = models.images;

let url2 = [];
const getUrl = (req, res, next) => {
  let Url = req.url;
  Url = Url.slice(8);
  if (Url === "vent") {
    console.log(url2);
    app.post(
      "/login-event",
      passport.authenticate("local", {
        successRedirect: "/public/" + url2[url2.length - 1],
        failureRedirect: "/login-event",
        failureFlash: true,
        badRequestMessage: "「メールアドレス」と「パスワード」は必須入力です。",
      })
    );
  }
  event.findAll({
    where: {
      url: Url
    },
    attributes: ["id"]
  }).then(id => {
    if (id != "") {
      console.log(id);
      let eventid = id[0]["id"];
      exports.eventid = eventid;
      event.findAll({
        where: { id: eventid },
        attributes: ["url"]
      }).then(event_url => {
        url2.push(event_url[0]["url"]);
      })
    }
  })
  next()
}
const participant = models.participant;
app.use(getUrl);
app.get("/", function (req, res) {
  res.render("top_page");
});
app.get("/login", function (req, res) {
  res.render("login");
});
app.get("/login-event", function (req, res) {
  res.render("login_event");
});

// イベント削除
const events = models.event;
const colors = require("colors")
app.post('/delete/:id', function (req, res) {
  var event_id = req.params.id;
  console.log("id------------------------------".rainbow, event_id);
  events.findByPk(event_id)
    .then(event => {
      event.destroy();
    })
  res.render('/holdEvent');
})

const fs = require('fs');
const AWS = require('aws-sdk');
const multer = require('multer');
const upload = multer({ dest: 'uploads-icon/' });

app.post("/config", upload.single('icon'), function (req, res) {
  const id = req.user.id;

  const ID = 'AKIAJVYTNUXNYUPZSPKQ';
  const SECRET = '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';
  const BUCKET_NAME = 'eveiku-test1';
  const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
  });


  const uploadFile = (fileName) => {
    const fileContent = fs.readFileSync(fileName);
    const params = {
      Bucket: BUCKET_NAME,
      Key: "usericon/" + 'icon-' + id + ".jpg",
      Body: fileContent
    };
    s3.upload(params, function (err, data) {
      if (err) {
        throw err;
      }
      console.log(`File uploaded successfully. ${data.Location}`);
      console.log(id);
      users.update(
        { avatar: data.Location },
        { where: { id: id } },
      ).then(() => {
        let img_del = req.file.path.slice(13);
        fs.unlinkSync("uploads-icon/" + img_del);
      })
    });
  };
  // const downloadFile = () => {
  //   var params = {
  //     Key: "usericon/" + 'icon-'+id+".jpg",
  //     Bucket: BUCKET_NAME
  //   }
  //   s3.getObject(params, function(err, data) {
  //     if (err) {
  //       throw err
  //     }
  //     fs.writeFileSync("usericon/" + 'icon-'+id+".jpg", data.Body)
  //     console.log('File downloaded successfully')
  //   })
  // }

  if (req.file != undefined) {
    uploadFile(req.file.path);
  }
  // downloadFile();
  users.update(
    {
      bio: req.body.bio,
      email: req.body.email,
      name: req.body.name,
      gender: req.body.gender,
      occupation: req.body.occupation,
      industry: req.body.industry,
      company: req.body.company,
      university: req.body.university,
      birthday: req.body.birthday,
    },
    { where: { id: id } }
  ).then(() => {
    res.redirect("myAccount");
  })
});



// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// ルータ関連
app.get("/", function (req, res) {
  res.redirect("/syu-top");
});

// 以下新規
app.use("/home", home_Router); // マイページ表示
app.use("/holdEvent", holdEvent_Router); // 開催イベント表示
app.use("/myEvent", myEvent_Router); // 参加イベント表示
app.use("/myAccount", myAccount_Router); // 参加イベント表示
app.use("/preview", preview_Router); //　プレビュー
app.use("/already", already_Router);
app.use("/limit", limit_Router);
app.use("/chart", chart_Router);
app.use("/message", message_Router);

// 主催者用ページ
app.use("/build-page", build_page_Router);
app.use("/management", authMiddleware, management_Router);

// 参加者用ページ
app.use("/public", public_Router);
app.use("/search-event", authMiddleware, search_event_Router);

// 事前登録
app.use("/pre-register-top", pre_register_top_Router);
app.use("/pre-register-complete", pre_register_complete_Router);
app.use("/pre-register-screen", pre_register_screen_Router);

// ユーザプロフィール表示
app.use("/user-profile", user_profile_Router);

// 主催者ログイン実行
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login",
    failureFlash: true,
    badRequestMessage: "「メールアドレス」と「パスワード」は必須入力です。",
  })
);
// app.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/organizer-mypage",
//     failureRedirect: "/organizer-login",
//     failureFlash: true,
//     badRequestMessage: "「メールアドレス」と「パスワード」は必須入力です。",
//   })
// );

// 参加者ログイン実行
app.post(
  "/participant-login",
  passport.authenticate("local", {
    successRedirect: "/participant-mypage",
    failureRedirect: "/participant-login",
    failureFlash: true,
    badRequestMessage: "「メールアドレス」と「パスワード」は必須入力です。",
  })
);


// 主催者会員登録
app.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.register_password, 10);
    users.create({
      email: req.body.register_email,
      password: hashedPassword,
      name: req.body.register_name,
      gender: req.body.register_gender,
      occupation: req.body.register_occupation,
      industry: req.body.register_industry,
      company: req.body.register_company,
      university: req.body.register_university,
      birthday: req.body.birthday,
      avatar: "https://eveiku-test1.s3-ap-northeast-1.amazonaws.com/usericon/%E4%BA%BA%E7%89%A9.png",
    });
    res.redirect("/login");
  } catch {
    // console.log(req.body.register_email);
    res.redirect("/login");
  }
});
// app.post("/register", async (req, res) => {
//   try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     users.create({
//       email: req.body.email,
//       password: hashedPassword,
//     });
//     res.redirect("/organizer-login");
//   } catch {
//     console.log(req.body.email);
//     res.redirect("/syu-sign-up");
//   }
// });

// 参加者会員登録
app.post("/participant-register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.create({
      email: req.body.email,
      password: hashedPassword,
    });
    res.redirect("/participant-login");
  } catch {
    console.log(req.body.email);
    res.redirect("/san-sign-up");
  }
});

// 参加者会員登録-for-event
// app.post("/participant-register-for-event-off", async (req, res) => {
//   try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     users.create({
//       email: req.body.email,
//       password: hashedPassword,
//     });
//     res.redirect("/participant-login-for-event-off");
//   } catch {
//     console.log(req.body.email);
//     res.redirect("/san-signup-for-event-off");
//   }
// });




// 参加者ログイン実行-for-event
// app.post(
//   "/participant-login-for-event-off",
//   passport.authenticate("local", {
//     successRedirect: "/verify-off",
//     failureRedirect: "/participant-login-for-event-off",
//     failureFlash: true,
//     badRequestMessage: "「メールアドレス」と「パスワード」は必須入力です。",
//   })
// );

// console.log(event_url);






// 参加者会員登録-for-event
// app.post("/participant-register-for-event-online", async (req, res) => {
//   try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     users.create({
//       email: req.body.email,
//       password: hashedPassword,
//     });
//     res.redirect("/participant-login-for-event-online");
//   } catch {
//     console.log(req.body.email);
//     res.redirect("/san-signup-for-event-online");
//   }
// });

// // 参加者ログイン実行-for-event
// app.post(
//   "/participant-login-for-event-online",
//   passport.authenticate("local", {
//     successRedirect: "/verify-online",
//     failureRedirect: "/participant-login-for-event-online",
//     failureFlash: true,
//     badRequestMessage: "「メールアドレス」と「パスワード」は必須入力です。",
//   })
// );

// 事前登録
app.post("/pre-register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      university: req.body.university,
      age: req.body.age,
      gender: req.body.gender,
      company: req.body.company,
      occupation: req.body.occupation,
    });
    res.redirect("/pre-register-complete");
  } catch {
    console.log(req.body.email);
    res.redirect("/pre-register-screen");
  }
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

var ticket_Router = require('./routes/ticket.js');
var tickets_Router = require('./routes/tickets.js');
var verify_Router = require('./routes/verify.js');
var upload_Router = require('./routes/upload-img.js');

app.use("/ticket", ticket_Router);
app.use("/tickets", tickets_Router);
app.use("/verify", verify_Router);
const { schedule } = require("node-cron");
app.use("/upload-img", upload_Router);

module.exports = app;
