const mongoose = require("mongoose");

const ChampionSchema = new mongoose.Schema(
  mongoose.Schema({
    name: { type: String },
    ult: { type: String },
    myFav: { type: Boolean },
  })
);

module.exports = {
  model: mongoose.model("Champions", ChampionSchema),
};
