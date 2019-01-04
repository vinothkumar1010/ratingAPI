var mongoose = require("mongoose");
const autoincremental = require("../../helpers/autoincrement");
/* var CounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 1 }
});
var counter = mongoose.model("counter", CounterSchema); */

var MovieSchema = new mongoose.Schema({
  id: { type: Number, unique: true, default: 1 },
  name: String,
  language: Number,
  region: Number,
  released: Boolean,
  release_date: { type: Date, default: 0 },
  poster: String
});
MovieSchema.pre("save", function(next) {
  autoincremental(model, this, next,"id");
  // Arguments:
  // model: The model const here below
  // this: The schema, the body of the document you wan to save
  // next: next fn to continue
});

const model = mongoose.model("movies", MovieSchema);

module.exports = model;
