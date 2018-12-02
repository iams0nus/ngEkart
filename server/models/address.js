const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  addresses: [{
    addr1: String,
    addr2: String,
    city: String,
    state: String,
    country: String,
    postalCode: String
  }],
  created: {
    type: Date,
    default: Date.now
  }
});

AddressSchema.plugin(deepPopulate);

module.exports = mongoose.model('Address', AddressSchema);