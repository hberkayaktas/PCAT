const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Tablo oluşturma
const PhotoSchema = new Schema({
  title: String,
  description: String,
  image: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Photo = mongoose.model('Photo', PhotoSchema);
//                            burada photo collections ismi


module.exports = Photo;