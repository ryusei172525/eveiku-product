// already.js
// 参加済みの際に表示

var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
    res.render('already');
})


module.exports = router;