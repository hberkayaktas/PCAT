const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const Photo = require('./models/Photo');
const fileUpload = require('express-fileupload');

const app = express();

//database bağlantısı
mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//kendi kendine veri tabanı yoksa oluşturur senle alakası olmaz

//Template Engine
app.set('view engine', 'ejs');

// middle wares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

//routes
app.get('/', async (req, res) => {
  const photos = await Photo.find({}).sort('-dateCreated');
  res.render('index', {
    photos,
  });
});
app.get('/about', (req, res) => {
  res.render('about');
});

//routes
app.get('/photos/:id', async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo,
  });
});
// Foto ekleme sayfası
app.get('/add', (req, res) => {
  res.render('add');
});
app.post('/photos', async (req, res) => {
  const uploadDir = 'public/uploads';
  if(!fs.existsSync (uploadDir)) { fs.mkdirSync(uploadDir)  }
  
  let uploadeImage = req.files.image;
  let uploadPath = __dirname + '/public/uploads/' + uploadeImage.name;
  uploadeImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadeImage.name,
    });
    res.redirect('/');
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
