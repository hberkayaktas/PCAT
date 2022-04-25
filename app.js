const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const Photo = require('./models/Photo')


const app = express();


//database bağlantısı
mongoose.connect('mongodb://localhost/pcat-test-db',
{
  useNewUrlParser:true,
  useUnifiedTopology:true
});
//kendi kendine veri tabanı yoksa oluşturur senle alakası olmaz

//Template Engine
app.set('view engine', 'ejs');

// middle wares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.get('/', async (req, res) => {
  const photos = await Photo.find({})
  res.render('index',{
    photos
  });
});
app.get('/about', (req, res) => {
  res.render('about');
});
//routes
app.get('/photos/:id', async (req, res) => {
  const photo = await Photo.findById(req.params.id)
  res.render('photo',{
    photo
  });
});
// Foto ekleme sayfası
app.get('/add', (req, res) => {
  res.render('add');
});
app.post('/photos', async (req, res) => {
  await Photo.create(req.body);
  res.redirect('/');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
