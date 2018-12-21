var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  name: String,
  email: String,
  active: Boolean,
  doj:{ type: Date, default: Date.now() },
  user_id: { type: Number, unique: true }
});
mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');