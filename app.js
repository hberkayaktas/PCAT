const express = require('express');
const path = require('path');
const app = express();

//örnek bir middleware yazalım
const myLogger = (req,res, next) =>{  
      console.log("Middleware Log 1");
      next(); //middleware takılı kalmasın diye devam ettiriyoruz
}
app.use(myLogger); //middleware ı çağıralım




// middle wares
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'temp/index.html'));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
