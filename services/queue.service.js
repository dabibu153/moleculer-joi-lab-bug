const BullQueue = require("moleculer-bull");

module.exports = {
  name: "queueService",
  mixins: [
    BullQueue({
      redis: {
        host: "127.0.0.1",
        port: 6379,
        password: "",
        db: 0,
      },
    }),
  ],
  queues: {
    ["mail.send"]: {
      concurrency: 2,
      async process(job) {
        for (let i = 0; i < 50; i++) {
          await new Promise((resolve) =>
            setTimeout(() => {
              console.log("queue called, i am inside the queue", job.data);
              resolve(true);
            }, 200)
          );
        }
      },
    },
  },
};
