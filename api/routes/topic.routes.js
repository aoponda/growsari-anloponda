module.exports = app => {
  const topics = require("../controllers/topic.controller.js");
  var router = require("express").Router();

  // get all Topic records
  router.get("/", topics.findAll);

  // find Topic by id
  router.get("/:id", topics.findOne);

  // FIND Topic BY id WITH MESSAGES
  router.get("/:id/messages", topics.findOneWithMessages);

  // register/create Topic
  router.post("/", topics.create);

  // update Topic
  router.put("/:id", topics.update);

  // sof delete Topic
  router.put("/:id", topics.softDelete);

  // delete Topic by id
  router.delete("/:id", topics.deleteOne);

  // delete all Topic records
  router.delete("/", topics.deleteAll);

  app.use(["/api/topics", "/api/topic"], router);
};