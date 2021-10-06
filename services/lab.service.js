// lab.service.js
const Laboratory = require("@moleculer/lab");

module.exports = {
    mixins: [Laboratory.AgentService],
    settings: {
        name: "labTest101",
        token: "qwerty123",
        apiKey: "4GNKVAH-KWB4Z40-KV73SPR-P751VF7"
    }
};