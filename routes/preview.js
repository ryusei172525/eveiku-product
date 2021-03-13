var express = require("express");
var router = express.Router();
const model = require("../models");
const Event = model.event;


router.get("/", async function (req, res) {
  const user = req.user.id;
  const data = req.body.html.row;
  if (req.body.user_id == user) {
    res.render("preview", data);
  }
});

router.get("/:id", async function (req, res) {
  const user = req.user.id;
  const event_id = req.params.id;
  const event = await Event.findOne({ where: { id: event_id } });
  const data = {
    html: JSON.parse(JSON.stringify(event.draft_html.row)),
  };
  if (event.user_id == user) {
    res.render("preview", data);
  }
});

module.exports = router;
