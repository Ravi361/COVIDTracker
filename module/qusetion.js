var mongoose = require('mongoose')
var questionschema = new mongoose.Schema(
    {
        author:String,
        question:String,
        answer:[]
    }
)
module.exports = mongoose.model('question',questionschema)