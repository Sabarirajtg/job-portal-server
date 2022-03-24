const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    required: true,
    default: 1,
    enum: [0, 1, 2],
    //0 for admin, 1 for users, 2 for company management
  },
  verificationString: {
    type: String,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "company",
  },
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
