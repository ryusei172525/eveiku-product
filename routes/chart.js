var express = require("express");
var router = express.Router();

router.get("/",  function (req, res) {
    var data = {
        avatar: req.user.avatar,
        name: req.user.name,
    }
    res.render('chart', data);
})


module.exports = router;