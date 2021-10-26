const mongoose = require('mongoose');
const Schema  =mongoose.Schema


const commentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    pizzaId:{
        type: Schema.Types.ObjectId ,
        ref:'Pizza',
        required : true,
    },
    user:{
        name:{
            type: String,
            ref:'User'
        },

        userId:{
            type: Schema.Types.ObjectId,
            ref:'User'
        }
    }
    
});

module.exports = mongoose.model('Comment',commentSchema)
