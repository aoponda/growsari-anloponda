const db = require("../models");
const Topic = db.topics;
const Message = db.messages;

// sort alphabetically
exports.findAll = (req, res) => {
  Topic.find({})
    .sort("subject")
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({message: err.message || "No Topics."});
      return;
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Topic.findById(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({message: err.message || "Cannot find Topic with ID."});
      return;
    });
};


exports.findOneWithMessages = (req, res) => {
  const id = req.params.id;
  const condition = {
    topic_id: id
  };
  Message.find(condition)
    .populate("created_by", "name")
    .populate("topic_id")
    .exec(function (err, results) {
      if (err) {
        res
          .status(500)
          .send({message: err.message || "Cannot find Topic with ID."});
        return;
      }
      res.send(results);
    })
};

exports.create = (req, res) => {
  var subject = req.body.subject;
  var description = req.body.description;
  var userId = req.body.userId;

  if (!subject) {
    res
      .status(400)
      .send({message: "Subject should not be empty!"});
    return;
  } else if (!description) {
    res
      .status(400)
      .send({message: "Description should not be empty!"});
    return;
  } 

  Topic.find({subject: subject})
    .then(topics => {
      if (topics.length == 0) {
        var currentDate = new Date().toISOString();
        const topic = new Topic({
          subject: subject,
          description: description,
          created_by: userId,
          updated_by: userId,
          created_at: currentDate,
          updated_at: currentDate
        });

        topic
          .save(topic)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res
              .status(500)
              .send({message: err.message || "Error creating Topic."})
              return;
          });
      } else {
        res
          .status(409)
          .send({message: "Topic already exists."});
          return;
      }

    })
    .catch(err => {
      res
        .status(500)
        .send({message: err.message || "Error creating User."})
        return;
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    res
      .status(400)
      .send({message: "Data to update cannot be empty"});
      return;
  }

  const currentDate = new Date().toISOString();
  const id = req.params.id;
  const body = req.body;
  body.updated_at = currentDate;

  Topic.findByIdAndUpdate(id, body, { useFindAndModify: false })
    .then(data => {
      if (data.length == 1) {
        res.send({ message: "Topic updated successfully."});
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
        .send({message: "Error updating Topic."})
        return;
    });
};


exports.softDelete = (req, res) => {
  const currentDate = new Date().toISOString();
  const id = req.params.id;
  const body = req.body;
  body.deleted_at = currentDate;

  Topic.findByIdAndUpdate(id, body, { useFindAndModify: false })
    .then(data => {
      if (data.length == 1) {
        res.send({ message: "Topic soft deleted successfully."});
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
        .send({message: "Error soft deleting Topic."})
        return;
    });
};

exports.deleteOne = (req, res) => {
  const id = req.params.id;

  Topic.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res
          .status(404)
          .send({message: "Cannot delete Topic with ID"});
      } else {
        res.send({message: "Topic was successfully removed."});
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({message: err.message || "Cannot delete user with ID"});
    });
};

exports.deleteAll = (req, res) => {
  Topic.deleteMany({})
    .then(data => {
      res.send({message: "Topics successfully removed."});
    })
    .catch(err => {
      res
        .status(500)
        .send({message: err.message || "Cannot delete users"});
    });
};