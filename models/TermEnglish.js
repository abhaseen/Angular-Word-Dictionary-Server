const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Definition = require('./Definition');

const termEnglishSchema = new Schema({
  wordEnglish: { type: String, required: true, unique: true },
  wordNonEnglish: { type: String, default: '' },
  wordExpanded: { type: String, default: '' },
  languageCode: { type: String, default: 'en' },
  image: { type: String, default: '' },
  imageType: { type: String, default: '' },
  audio: { type: String, default: '' },
  audioType: { type: String, default: '' },
  linkAuthoritative: { type: String, default: '' },
  linkWikipedia: { type: String, default: '' },
  linkYouTube: { type: String, default: '' },
  authorName: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
  dateRevised: { type: Date, default: '' },
  fieldOfStudy: { type: String, required: true },
  helpYes: { type: Number, default: 0 },
  helpNo: { type: Number, default: 0 },
  definitions: [Definition.schema],
});

module.exports = mongoose.model('English Term', termEnglishSchema);
