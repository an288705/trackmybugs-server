require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();

mongoose.connect(process.env.DB_URL,{useNewUrlParser : true, useUnifiedTopology : true},(err)=>{
    if(!err) return console.log('connected to DB')

    console.log(err);
})

/*set up express server on whichever database port is open*/
const PORT = process.env.PORT || 3500 

app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
app.use(cors());

app.use('/auth',require('./Routes/Auth'));

app.listen(PORT,()=>{
    console.log('listening on '+PORT);
});
