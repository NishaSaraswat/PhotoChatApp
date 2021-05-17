const express = require ('express');
const connectDB = require('./config/db');
const formidable = require('formidable')
const fs = require('fs')
const app = express();

connectDB();

app.use(express.json({extended:false}));
app.get('/', (req, res)=>res.send('Welcome to my chat app'));
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/userprofile', require('./routes/profile'));


//----------camera server part-----------//

app.post('/api/upload', (req, res) => {

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
      fs.writeFileSync(__dirname + '/www/uploads/' + file.name, fileData)
  
      res.json({ fields, file });
    });
  });
  
  app.use(express.static(__dirname + '/www'))
//----------camera server part-----------//

const PORT = process.env.PORT || 5000;


app.listen(PORT,() => console.log("Server running"));