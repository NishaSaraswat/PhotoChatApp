const express = require ('express');
const connectDB = require('./config/db');
const formidable = require('formidable')
const fs = require('fs')
const app = express();

connectDB();
//setup cross origen
app.use(require("cors")());
app.use(express.json({extended:true}));
app.get('/', (req, res)=>res.send('Welcome to my chat app'));
app.use('/api/register', require('./routes/register'));
app.use('/api/login', require('./routes/login'));
app.use('/api/profile', require('./routes/profile'));



//----------camera server part-----------//

app.post('/api/public/uploads', (req, res) => {

    const form = formidable();
   
    form.parse(req, (err, fields, file) => {
      if (err) {
        res.end(err);
        return;
      }
  
      fields.location && console.log('location', JSON.parse(fields.location));
      fields.address && console.log('address', JSON.parse(fields.address));
  
      file = file.file
      

      let fileData = fs.readFileSync(file.path)
      fs.writeFileSync(__dirname + '/public/uploads/' + file.name, fileData)
  
      res.json({ fields, file });
    });
  });
  
  app.use(express.static(__dirname + '/public'))
//----------camera server part-----------//

const PORT = process.env.PORT || 5000;


app.listen(PORT,() => console.log("Server running"));