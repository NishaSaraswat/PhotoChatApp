const express = require ('express');
const connectDB = require('./config/db');
const app = express();

connectDB();

app.use(express.json({extended:false}));
app.get('/', (req, res)=>res.send('Welcome to my chat app'));
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/userprofile', require('./routes/profile'));

const PORT = process.env.PORT || 5000;


app.listen(PORT,() => console.log("Server running"));