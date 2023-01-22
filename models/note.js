const mongoose = require('mongoose')
const Schema = mongoose.Schema

const noteSchema = new Schema(
    {
   
       title: {
        type: String,
        required: true
       },

       body: {
        type: String,
        required: true
       },
        note: String,
       user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
       }
    
}
);

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;
