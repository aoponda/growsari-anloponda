module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // get all User records
  router.get("/", users.findAll);

  // find User by id
  router.get("/:id", users.findOne);

  // register/create User
  router.post("/register", users.register);

  // login User
  router.post("/login", users.login);

  // delete User by id
  router.delete("/:id", users.deleteOne);

  // delete all User records
  router.delete("/", users.deleteAll);

  app.use(["/api/users", "/api/user"], router);
};