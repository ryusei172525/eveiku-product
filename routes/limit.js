// limit.js
// 参加上限に達した際
var express = require("express");
var router = express.Router();

router.get("/",  function (req, res) {
    res.render('limit');
})


module.exports = router;