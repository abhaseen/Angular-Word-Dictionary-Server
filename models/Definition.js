const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const definitionSchema = new Schema({
  authorName: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
  definition: { type: String, required: true },
  quality: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
});

module.exports = mongoose.model('Definition', definitionSchema);
