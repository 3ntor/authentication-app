const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    name: String,
    email: String,
    age: Number,
    password: String
})

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}
module.exports = mongoose.model("users" , userSchema)