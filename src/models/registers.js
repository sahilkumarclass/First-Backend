const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userDetailSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// Generate authentication token
userDetailSchema.methods.generateAuthToken = async function () {
  try {
    console.log(this._id);
    const token = jwt.sign({ _id: this._id.toString()}, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({token: token});
    await this.save();
    return token;
  } catch (error) {
    console.log("The error part: " + error);
    throw error; // You should throw the error here instead of sending it as a response
  }
};

// Password hashing before saving
userDetailSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    this.confirmpassword = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Create a collection
const Register = mongoose.model("Register", userDetailSchema);

module.exports = Register;
