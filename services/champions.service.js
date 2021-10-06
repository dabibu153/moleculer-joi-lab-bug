const BullQueue = require("moleculer-bull");
const Joi = require("joi");
const { ServiceNotFoundError } = require("moleculer").Errors;



module.exports = {
  name: "chp",
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
  actions: {
    checkDecimal: {
      params: Joi.object({
        num: Joi.number(),
      }),
      async handler(ctx) {
        return ctx.params;
      },
    },

    cus: {
      params: Joi.object({
        a: Joi.number().required(),
        b: Joi.number().required(),
        c: Joi.number().required(),
      }),
      async handler(ctx) {
        return ctx.params;
      },
    },
    arrayCheck: {
      params: Joi.object({
        a: Joi.number().valid(1, 2, 3),
        b: Joi.alternatives().conditional("a", {
          is: 1,
          then: Joi.number().valid(1).required(),
        }),
        c: Joi.alternatives().conditional("a", {
          is: 2,
          then: Joi.number().valid(2).required(),
        }),
        d: Joi.alternatives().conditional("a", {
          is: 3,
          then: Joi.number().valid(3).required(),
        }),
      }),
      async handler(ctx) {
        return ctx.params;
      },
    },
    checkLen: {
      params: Joi.object().keys({
        arr: Joi.array().min(0).length(3).required(),
      }),
      async handler(ctx) {
        return ctx.params;
      },
    },
    checkValid: {
      params: Joi.object().keys({
        eventId: Joi.string(),
        eventCounter: Joi.number(),
        coordinatorCounter: Joi.number(),
        coordinatorId: Joi.string(),
        coordinatorToken: Joi.string(),
      }),
      async handler(ctx) {
        return ctx.params;
      },
    },

    log: {
      handler(ctx) {
        this.logger.error({ apiLog: true, message: "this is a api called error message" })
        this.logger.info("info");
        return ctx.params;
      },
    },
    //addChamp: async function (ctx) {
    //   await this.schema.model.insert({
    //     name: ctx.params.name,
    //     ult: ctx.params.ult,
    //     myFav: ctx.params.myFav,
    //   });
    //   return "done";
    // },
    // getAllChamps: async function () {
    //   const list = await this.schema.model.find();
    //   return list;
    // },
    // getMyFavs: async function () {
    //   const myFavs = await this.schema.model.find({ myFave: true });
    //   return myFavs;
    // },
    // getByName: async function (ctx) {
    //   console.log(this.schema);
    //   const oneChamp = await this.schema.model.findOne({
    //     name: ctx.params.name,
    //   });
    //   return oneChamp;
    // },
    // deleteChamp: async function (ctx) {
    //   await this.schema.model.deleteOne({ name: ctx.params.name });
    //   return "deleted";
    // },
    // doAggregation: async function (ctx) {
    //   const myFavCount = await this.schema.model.aggregate([
    //     {
    //       $match: {
    //         myFav: true,
    //       },
    //     },
    //     {
    //       $count: "myFav",
    //     },
    //   ]);
    //   return myFavCount;
    // },
    // addToQueue: function () {
    //   this.createJob("mail.send", { a: 1 });
    //   this.getQueue("mail.send").on("global:progress", (jobID, progress) => {
    //     console.log(`Job #${jobID} progress is ${progress}%`);
    //   });

    //   this.getQueue("mail.send").on("global:completed", (job, res) => {
    //     console.log(`Job #${job.id} completed!. Result:`, res);
    //   });

    //   console.log("action completed");
    // },
  },
};

const stringifiedJSONValidator = (value, helper) => {
  try {
    JSON.parse(value);

    return true;
  } catch (_e) {
    return helper.message("filter must be a JSON string");
  }
};
