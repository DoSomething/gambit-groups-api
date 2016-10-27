// If we ever make more models for some reason this needs to move out.
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);

const Schema = mongoose.Schema;

const groupSchema = new Schema({
  campaign_id:  Number,
  campaign_run_id: Number,
  mobilecommons_groups: {
    local: Number,
    thor: Number,
    production: Number
  }
});
groupSchema.index({campaign_id: 1, campaign_run_id: 1}, {unique: true});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
