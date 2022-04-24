const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//database bağlantısı
mongoose.connect('mongodb://localhost/pcat-test-db');

// Tablo oluşturma
const PhotoSchema = new Schema({
      title: String,
      description: String
})

const Photo = mongoose.model('Photo',PhotoSchema)
//                            burade photo collections ismi


// veri ekleme 
Photo.create({
      title: 'Photo Title 1',
      description: 'bu bir photo descriptionudur',
})