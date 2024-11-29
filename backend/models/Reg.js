const mongoose = require("mongoose")

const regSchema = mongoose.Schema({
    username: {type: String},
    password: {type: String},
    email: {type: String}
})


module.exports = mongoose.model("Reg", regSchema)