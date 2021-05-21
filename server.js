const express = require ('express');
var cors = require('cors');
const connectDB = require('./config/db');
const formidable = require('formidable')
const fs = require('fs')
const app = express();
app.options('*', cors())
connectDB();

//setup cross origen
app.use(cors());
app.use(express.json({extended:true}));
app.get('/', (req, res)=>res.send('Welcome to my chat app'));
app.use('/api/register', require('./routes/register'));
app.use('/api/login', require('./routes/login'));
app.use('/api/profile', require('./routes/profile'));


// endpoint to handle formData uploads
app.post('/api/uploadedphotos', (req, res) => {
  // uses npm module 'formidable' to read the formData
  const form = formidable();

  form.parse(req, (err, fields, file) => {
    if (err) {
      res.end(err);
      return;
    }

    fields.location && console.log('location', JSON.parse(fields.location));
    fields.address && console.log('address', JSON.parse(fields.address));

    // get the file, from file
    file = file.file
    
    // open file with 'fs' to enable it to be 
    // saved as a file
    let fileData = fs.readFileSync(file.path)
    fs.writeFileSync(__dirname + '/api/uploadedphotos' + file.name, fileData)

    res.json({ fields});
  });
});

const PORT = process.env.PORT || 5000;


app.listen(PORT,() => console.log("Server running"));