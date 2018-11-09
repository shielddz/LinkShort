const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LinkSchema = new Schema({
    url:{
        type:String,
        required:true
    },
    short:{
        type:String,
        required:true
    }/*,
    username:{
        type:String,
        required:true
    }*/
});

module.exports = Item = mongoose.model('Link', LinkSchema);