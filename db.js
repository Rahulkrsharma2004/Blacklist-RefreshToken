const mongoose = require("mongoose")
const mongoURL = process.env.mongoURL

const connection = mongoose.connect(mongoURL)

module.exports = {connection}