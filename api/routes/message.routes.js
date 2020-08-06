module.exports = app => {
  const messages = require("../controllers/message.controller.js");
  var router = require("express").Router();

  // get all Message records
  router.get("/", messages.findAll);

  // find Message by id
  router.get("/:id", messages.findOne);

  // register/create Message
  router.post("/", messages.create);

  // delete Message by id
  router.delete("/:id", messages.deleteOne);

  // delete all Message records
  router.delete("/", messages.deleteAll);

  app.use(["/api/messages", "/api/message"], router);
};