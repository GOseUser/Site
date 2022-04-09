const { default: mongoose } = require("mongoose");

noteSchema = new mongoose.Schema({
    data:String,
    time:String,
    author:String
});
const Note = mongoose.model('Note',noteSchema);
module.exports = Note;