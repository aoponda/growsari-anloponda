const db = require("../models");
const Message = db.messages;
const Topic = db.topics;


// sort alphabetically
exports.findAll = (req, res) => {
  Message.find({})
    // .sort("created_at", -1)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({message: err.message || "No Messages."});
      return;
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Message.findById(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({message: err.message || "Cannot find Message with ID."});
      return;
    });
};


exports.create = (req, res) => {
  var topicId = req.params.id;
  var userMessage = req.body.message;
  var userId = req.body.userId;

  if (!message) {
    res
      .status(400)
      .send({message: "Message should not be empty!"});
    return;
  }

  var currentDate = new Date().toISOString();
  const message = new Message({
    topic_id: topicId,
    message: userMessage,
    created_by: userId,
    updated_by: userId,
    created_at: currentDate,
    updated_at: currentDate
  });

  message
    .save(message)
    .then(data =>{
      Topic.findById(topicId)
        .then(topics => {
          if (topics.length == 1) {
            var topic = topics[0];
            topic.message.push(data.id);

            Topic.findByIdAndUpdate(topicId, topic, { useFindAndModify: false })
              .then(data => {
                if (data.length == 1) {
                  res.send({ message: "Message added successfully."});
                } else {
                  res
                    .status(409)
                    .send({message: "Topic cannot be found."});
                    return;
                }
              })
              .catch(err => {
                res
                  .status(500)
                  .send({message: "Error updating Topic's Message."})
                  return;
              });
          } else {
            res
              .status(500)
              .send({message: err.message || "Error fetching Topic."})
            return;
          }
        })
        .catch(err => {
          res
            .status(500)
            .send({message: err.message || "Error fetching Topic."})
            return;
        });
    })
    .catch(err => {
      res
        .status(500)
        .send({message: err.message || "Error creating Message."})
        return;
    });
};


exports.deleteOne = (req, res) => {
  const id = req.params.id;

  Message.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res
          .status(404)
          .send({message: "Cannot delete Message with ID"});
      } else {
        res.send({message: "Message was successfully removed."});
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({message: err.message || "Cannot delete user with ID"});
    });
};

exports.deleteAll = (req, res) => {
  Message.deleteMany({})
    .then(data => {
      res.send({message: "Messages successfully removed."});
    })
    .catch(err => {
      res
        .status(500)
        .send({message: err.message || "Cannot delete users"});
    });
};