const mongoose = require('mongoose');

const blacklistTokenSchema =  mongoose.Schema({
  token: { type: String, required: true, unique: true },

},{
    versonKey:false
});

const BlacklistToken = mongoose.model('BlacklistToken', blacklistTokenSchema);

module.exports = {BlacklistToken};
