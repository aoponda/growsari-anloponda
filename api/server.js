const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const db = require("./models");

var port = process.env.PORT || 8082;
var corsOptons = {
  origin: "http://localhost:8081" 
};
// secret key
process.env.SECRET_KEY = "secret";

app.use(cors(corsOptons));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect to db
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Database: ", db.url);
  })
  .catch(err => {
    console.log("Connect connect to the database.", err);
  });

// routes
app.get("/", (req, res) => {
  res.json({ message: "Hello world"});
});

require("./routes/user.routes")(app);
require("./routes/topic.routes")(app);
require("./routes/message.routes")(app);


app.listen(port, () => {
  console.log("Port: ", port);
});