const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.set("debug", true);

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.users = require("./user.model.js")(mongoose);
db.topics = require("./topic.model.js")(mongoose);
db.messages = require("./message.model.js")(mongoose);

module.exports = db;