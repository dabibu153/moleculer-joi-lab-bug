const DbService = require("moleculer-db");
const MongooseAdapter = require("moleculer-db-adapter-mongoose"); // uses mongoose from internally
const mongoose = require("mongoose");

module.exports = function () {
  try {
    return {
      mixins: [DbService],
      adapter: new MongooseAdapter("mongodb://localhost/valorant"),
      model: require("./models/champion")["model"],
    };
  } catch (error) {
    console.log(`Error while attaching database, ${error}`);
  }
};
