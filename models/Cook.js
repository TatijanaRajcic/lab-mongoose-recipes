const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cookSchema = new Schema({
  name: String,
  bio: String
})

const Cook = mongoose.model("Cook", cookSchema, "cooks");
// NAME OF MODEL / SCHEMA / COLLECTION

module.exports = Cook;