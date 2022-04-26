const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const photoController = require('./controllers/photoControllers');
const pageController = require('./controllers/pageControllers');
const connectstring = require('./connectstring');

const app = express();

//mongodb://localhost/pcat-test-db
//database bağlantısı
mongoose.connect(connectstring.CDBString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
  console.log('DB connect!');
}).catch((err)=>{
  console.log(err);
});
//kendi kendine veri tabanı yoksa oluşturur senle alakası olmaz

//Template Engine
app.set('view engine', 'ejs');

// middle wares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//routes
app.get('/', photoController.getAllphotos);
app.get('/photos/:id', photoController.getPhoto);
app.post('/photos', photoController.createPhoto);
app.put('/photos/edit/:id',photoController.updatePhoto);
app.delete('/delete-photo/:id', photoController.deletePhoto);



app.get('/edit-photo/:id', pageController.editPhotoPage);
app.get('/about', pageController.getAboutPage);
app.get('/add',pageController.getAddPage);



const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
