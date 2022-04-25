const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//database bağlantısı
mongoose.connect('mongodb://localhost/pcat-test-db');
//kendi kendine veri tabanı yoksa oluşturur senle alakası olmaz


// Tablo oluşturma
const PhotoSchema = new Schema({
  title: String,
  description: String,
});

const Photo = mongoose.model('Photo', PhotoSchema);
//                            burada photo collections ismi

/*
// veri ekleme 
Photo.create({
      title: 'Photo Title 1',
      description: 'bu bir photo descriptionudur',
})*/

/*
//veri çekme
Photo.find({},(err,data)=>{
      console.log(data);
})//*/

/*
//veri güncelleme
const id_ = '6265865b4cea71921d470af4';
Photo.findByIdAndUpdate(
      id_,{
            title: 'fotoğraf başlığı güncellendi',
            description: 'açıklama güncellendi'
      },{
            new:true
      },
      (err,data) =>{
            console.log(data);
      }
)
*/
/*
//veri silme
const id_ = '6265865b4cea71921d470af4';

Photo.findByIdAndDelete(id_, (err, data) => {
      console.log('Photo is removed..');
      });*/
