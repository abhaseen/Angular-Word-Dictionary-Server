const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Definition = require('./Definition');

const termNonEnglishSchema = new Schema({
  termEnglishId: { type: 'ObjectId', ref: 'English Term', required: true },
  wordEnglish: { type: String, required: true },
  wordNonEnglish: { type: String, default: '', required: true },
  wordExpanded: { type: String, default: '' },
  languageCode: { type: String, default: '' },
  image: { type: String, default: '' },
  imageType: { type: String, default: '' },
  audio: { type: String, default: '' },
  audioType: { type: String, default: '' },
  linkAuthoritative: { type: String, default: '' },
  linkWikipedia: { type: String, default: '' },
  linkYouTube: { type: String, default: '' },
  authorName: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
  dateRevised: { type: Date, defult: '' },
  fieldOfStudy: { type: String, defualt: '' },
  helpYes: { type: Number, default: 0 },
  helpNo: { type: Number, default: 0 },
  definitions: [Definition.schema],
});

module.exports = mongoose.model('Non-English Term', termNonEnglishSchema);
