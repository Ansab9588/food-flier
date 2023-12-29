const { default: mongoose } = require("mongoose");
const Mongoose = require("mongoose");

const { Schema } = Mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    email: {
        type :String,
        required: [true,"Email is Required"],
    },
    password: {
        type: String ,
        required: true
    },
    date: {
        type: Date,  
        default:Date.now()
    }
});

module.exports = mongoose.model('user', UserSchema);