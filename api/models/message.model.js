const uuid = require("uuid");

module.exports = mongoose => {
  const Message = mongoose.model(
    "message",
    mongoose.Schema({
      _id: {
        type: String, 
        default: uuid.v1
      },
      message: {
        type: String,
        required: true
      },
      topic_id: {
        type: String,
        ref: "Topic"
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
      }
    })
  );

  return Message;
}