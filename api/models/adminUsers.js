const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  Instructor_ID:{
      type:String,
      required: true
  },
  email: {
    type: String,
    required: true
  },
  psw: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

// export model user with UserSchema
module.exports = mongoose.model("Admin", UserSchema,'Admins');