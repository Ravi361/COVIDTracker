var mongoose = require('mongoose')
var storySchema = new mongoose.Schema(
    {
        author:String,
        astory:String
    }
)
module.exports = mongoose.model('Story',storySchema)