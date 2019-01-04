var mongoose = require("mongoose");
const autoincremental = require("../../helpers/autoincrement");
var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  active: Boolean,
  doj: { type: Date, default: Date.now() },
  user_id: { type: Number, unique: true, default: 1 }
});
UserSchema.pre("save", function(next) {
  autoincremental(model, this, next,"user_id");
});
const model = mongoose.model("users", UserSchema);
module.exports = model;

