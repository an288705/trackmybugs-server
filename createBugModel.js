const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _id : String,
    name : String,
    details : String,
    steps : String,
    version : String,
    priority : String,
    assigned : String,
    creator : String,
    time : String
})

const model = mongoose.model('Bug',schema);

module.exports = model;