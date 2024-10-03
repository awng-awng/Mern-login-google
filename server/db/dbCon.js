const mongoose = require('mongoose');

const DB = process.env.DATABASE;

mongoose.connect(DB)  
    .then(() => console.log('MongoDB Connected!'))
    .catch(err => console.log(err)) 


