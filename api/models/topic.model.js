const uuid = require("uuid");

module.exports = mongoose => {
  const Topic = mongoose.model(
    "topic",
    mongoose.Schema({
      _id: {
        type: String, 
        default: uuid.v1
      },
      subject: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      created_by: {
        type: String,
        ref: "User"
      },
      updated_by: {
        type: String,
        ref: "User"
      },
      created_at: {
        type: String,
        required: true
      },
      updated_at: {
        type: String,
        required: true
      },
      deleted_at: {
        type: String
      },
      messages: [{
        messageId: {
          type: String,
          ref: 'Message'
        }
      }]
    })
  );

  return Topic;
}