module.exports = {
  name: "tools",
  actions: {
    async ultData(ctx) {
      const targetArray = await ctx.call(ctx.params.actionName);
      const data = {
        sage: "revive",
        raze: "rocket",
        cypher: "reveal",
        jett: "knives",
        reyna: "probably cocaine",
      };
      const finalData = {};
      targetArray.forEach((element) => {
        finalData[element] = data[element];
      });
      ctx.emit("champions.logTest");
      return finalData;
    },
    async slowFun() {
      const resp = await new Promise((resolve) =>
        setTimeout(() => {
          resolve("done");
        }, 5000)
      );
      return resp;
    },
  },
};
