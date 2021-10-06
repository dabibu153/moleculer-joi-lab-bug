// const winston = require("winston");
// const { extend } = require("moleculer").Logger;
const fs = require("fs");

const JoiValidator = require("./joiValidation");
const BaseLogger = require("moleculer").Loggers.Base;

require("@moleculer/lab");


class MyLogger extends BaseLogger {

  getLogHandler(bindings) {

    return (type, args) => {

      if (["info", "warn"].includes(type)) {

        console[type](`[${type}]: ${bindings.mod} - ${args} `);

      } else if (["error", "fatal"].includes(type)) {

        const logData = args[0].apiLog
          ? { ...args[0] }
          : { apiLog: false, message: args[0] };

        fs.appendFile(

          "./logs/impLog.log",
          JSON.stringify({ type, ...logData, mod: bindings.mod }) + `\n`,
          function (err) {

            if (err) console.log(err, "logger failed");

          }

        );

      }

    };

  }

}
// const Fastest = require("fastest-validator");
/**
 * Moleculer ServiceBroker configuration file
 *
 * More info about options: https://moleculer.services/docs/0.13/broker.html#Broker-options
 *
 * Overwrite options in production:
 * ================================
 * 	You can overwrite any option with environment variables.
 * 	For example to overwrite the "logLevel", use `LOGLEVEL = warn` env var.
 * 	To overwrite a nested parameter, e.g. retryPolicy.retries, use `RETRYPOLICY_RETRIES = 10` env var.
 *
 * 	To overwrite brokerâs deeply nested default options, which are not presented in "moleculer.config.js",
 * 	via environment variables, use the `MOL_` prefix and double underscore `__` for nested properties in .env file.
 * 	For example, to set the cacher prefix to `MYCACHE`, you should declare an env var as `MOL_CACHER__OPTIONS__PREFIX = MYCACHE`.
 */
module.exports = {
  // Namespace of nodes to segment your nodes on the same network.
  namespace: "",
  // Unique node identifier. Must be unique in a namespace.
  nodeID: null,
  // transporter: {
  //   type: "NATS",
  //   options: {
  //     url: "nats://localhost:4242",
  //     user: "tgDevelopmentUser",
  //     pass: "anshul007",
  //     // url: "nats://206.189.254.218:4242",
  //     // user: "tgProductionUser",
  //     // pass: "d6easGndTDvYrX58O27fVANWvwXWnE45",
  //     // // More info: https://github.com/nats-io/node-nats#tls
  //     // tls: {
  //     //     key: fs.readFileSync(path.join(__dirname, "..", "..", "commands", "nats-server", "certificates", "nats-server-client.pem")),
  //     //     // cert: fs.readFileSync(path.join(__dirname, "..", "..", "commands", "nats-server", "certificates", "nats-server-client.crt")),
  //     //     ca: [ fs.readFileSync(path.join(__dirname, "..", "..", "commands", "nats-server", "certificates", "rootCA.pem")) ]
  //     // }
  //   },
  // },
  // logger: (bindings) =>
  //   extend(
  //     winston.createLogger({
  //       format: winston.format.combine(
  //         winston.format.label({ label: bindings }),
  //         winston.format.timestamp(),
  //         winston.format.json()
  //       ),
  //       transports: [new winston.transports.Console()],
  //     })
  //   ),
  logger: [{
    type: "Console",
    options: { /*...*/ }
  }, "Laboratory"],
  // logLevel: "info",
  // logFormatter: "default",
  // // logFormatter(level, args, bindings) {
  // //   return level.toUpperCase() + " " + bindings.nodeID + ": " + args.join(" ");
  // // },
  // logObjectPrinter: null,

  // Define a cacher.
  // More info: https://moleculer.services/docs/0.14/caching.html
  cacher: null,

  // Define a serializer.
  // Available values: "JSON", "Avro", "ProtoBuf", "MsgPack", "Notepack", "Thrift".
  // More info: https://moleculer.services/docs/0.13/networking.html
  serializer: "JSON",

  // Number of milliseconds to wait before reject a request with a RequestTimeout error. Disabled: 0
  requestTimeout: 10 * 1000,

  // Retry policy settings. More info: https://moleculer.services/docs/0.13/fault-tolerance.html#Retry
  retryPolicy: {
    // Enable feature
    enabled: false,
    // Count of retries
    retries: 5,
    // First delay in milliseconds.
    delay: 1000,
    // Maximum delay in milliseconds.
    maxDelay: 10000,
    // Backoff factor for delay. 2 means exponential backoff.
    factor: 2,
    // A function to check failed requests.
    check: (err) => err && !!err.retryable,
  },

  // Limit of calling level. If it reaches the limit, broker will throw an MaxCallLevelError error. (Infinite loop protection)
  maxCallLevel: 100,

  // Number of seconds to send heartbeat packet to other nodes.
  heartbeatInterval: 5,
  // Number of seconds to wait before setting node to unavailable status.
  heartbeatTimeout: 15,

  // Tracking requests and waiting for running requests before shutdowning. More info: https://moleculer.services/docs/0.13/fault-tolerance.html
  tracking: {
    // Enable feature
    enabled: false,
    // Number of milliseconds to wait before shutdowning the process
    shutdownTimeout: 5000,
  },

  // tracing: {
  //   enabled: true,
  //   exporter: "Laboratory"
  // },

  // Disable built-in request & emit balancer. (Transporter must support it, as well.)
  disableBalancer: false,

  // Settings of Service Registry. More info: https://moleculer.services/docs/0.13/registry.html
  registry: {
    // Define balancing strategy.
    // Available values: "RoundRobin", "Random", "CpuUsage", "Latency"
    strategy: "RoundRobin",
    // Enable local action call preferring.
    preferLocal: true,
  },

  // Settings of Circuit Breaker. More info: https://moleculer.services/docs/0.13/fault-tolerance.html#Circuit-Breaker
  circuitBreaker: {
    enabled: true,
    threshold: 0.5,
    minRequestCount: 5,
    windowTime: 10, // in seconds
    halfOpenTime: 2000, // in milliseconds
    check: (err) => true,
  },
  // Settings of bulkhead feature. More info: https://moleculer.services/docs/0.13/fault-tolerance.html#Bulkhead
  bulkhead: {
    // Enable feature.
    enabled: true,
    // Maximum concurrent executions.
    concurrency: 5,
    // Maximum size of queue
    maxQueueSize: 10,
  },

  // Enable parameters validation. More info: https://moleculer.services/docs/0.13/validating.html

  // Custom Validator class for validation.
  // validator: new Fastest(),
  //validation: true,
  validator: new JoiValidator(),

  // Enable metrics function. More info: https://moleculer.services/docs/0.13/metrics.html
  // metrics: {
  //   enabled: true,
  //   reporter: ["Laboratory"]
  // },

  // Register internal services ("$node"). More info: https://moleculer.services/docs/0.13/services.html#Internal-services
  internalServices: true,
  // Register internal middlewares. More info: https://moleculer.services/docs/0.13/middlewares.html#Internal-middlewares
  internalMiddlewares: true,

  // Watch the loaded services and hot reload if they changed. You can also enable it in Moleculer Runner with `--hot` argument
  hotReload: false,

  // Register custom middlewares
  middlewares: [],

  // Called after broker created.
  created(broker) { },

  // Called after broker starte.
  started(broker) { },

  // Called after broker stopped.
  stopped(broker) { },

  // Register custom REPL commands.
  replCommands: null,
};
