const mongoose = require('mongoose')

const UserModel = mongoose.Schema({

})

const User = mongoose.model("Users", UserModel)

module.exports = User