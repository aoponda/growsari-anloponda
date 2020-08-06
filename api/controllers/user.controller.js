const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.users;


exports.findAll = (req, res) => {
  User.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({message: err.message || "No users."});
    });
};


exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({message: err.message || "Cannot find Topic with ID."});
    });
};


exports.register = (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  
  if (!name) {
    res
      .status(400)
      .send({message: "Name should cannot be empty!"});
      return;
  } else if (!email) {
    res
      .status(400)
      .send({message: "Email Address should cannot be empty!"});
      return;
  } else if (!password) {
    res
      .status(400)
      .send({message: "Password should cannot be empty!"});
      return;
  }

  User.find({email: email})
    .then(users => {
      if (users.length == 0) {
        bcrypt.hash(password, 10, (err, hash) => {
          var currentDate = new Date().toISOString();
          const user = new User({
            name: name,
            email: email,
            password: hash,
            created_at: currentDate,
            updated_at: currentDate,
          });
      
          user
            .save(user)
            .then(data => {
              res.send(data);
            })
            .catch(err => {
              res
                .status(500)
                .send({message: err.message || "Error creating User."})
                return;
            });
        });
      } else {
        res
          .status(409)
          .send({message: "Email already exists."});
          return;
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({message: "Error creating User."})
        return;
    })
};


exports.login = (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  
  if (!email) {
    res
      .status(400)
      .send({message: "Email Address should not be empty!"});
    return;
  } else if (!password) {
    res
      .status(400)
      .send({message: "Password should not be empty!"});
      return;
  }

  User.find({email: email})
    .then(users => {
      console.log("LENGTH:", users.length);
      if (users.length == 1) {
        const user = users[0];

        if (bcrypt.compareSync(password, user.password)) {
          const payload = {
            _id: user._id,
            name: user.name,
            email: user.email
          };

          let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 7200
          });
          res.send(token);
        } else {
          res
          .status(409)
          .send({message: "Incorrect password."});
          return;
        }
      } else {
        res
          .status(409)
          .send({message: "User does not exist."})
          return;
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({message: "Error finding User."})
        return;
    })
};


exports.deleteOne = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res
          .status(404)
          .send({message: "Cannot delete user with ID"});
      } else {
        res.send({message: "User was successfully removed."});
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({message: err.message || "Cannot delete user with ID"});
    });
};


exports.deleteAll = (req, res) => {
  User.deleteMany({})
    .then(data => {
      res.send({message: "Users successfully removed."});
    })
    .catch(err => {
      res
        .status(500)
        .send({message: err.message || "Cannot delete users"});
    });
};

