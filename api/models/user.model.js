const uuid = require("uuid");

module.exports = mongoose => {
  const User = mongoose.model(
    "user",
    mongoose.Schema({
      _id: {
        type: String, 
        default: uuid.v1
      },
      name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
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

  return User;
}