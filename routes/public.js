var express = require("express");
var router = express.Router();
const model = require("../models");
const Event = model.event;

router.get("/:id", async function (req, res) {
  const url = req.params.id;
  const event = await Event.findOne({ where: { url: url } });
  console.log(url)
  const data = {
    html: JSON.parse(JSON.stringify(event.html.row)),
    title: event.title
  };
  res.render("public", data);
});

module.exports = router;
