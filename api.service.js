const ApiService = require("moleculer-web");

module.exports = {
  name: "api",
  mixins: [ApiService],
  settings: {
    port: 8000,
    routes: [
      {
        path: "/valo/",
        aliases: {
          "GET allChamps": "champions.allChamps",
          "GET myFav": "champions.myFav",
          "GET ultData": "tools.ultData",
          "GET arrayTest": "champions.arrayCheck",
        },
        whitelist: [
          // Access to any actions in all services under "/api" URL
          "champions.allChamps",
          "champions.myFav",
          "tools.ultData",
          "champions.arrayCheck"
        ],
      },
    ],
  },
};
