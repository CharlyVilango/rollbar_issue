const Rollbar = require("rollbar");
const rollbar = new Rollbar({
  accessToken: "ROLLBAR_SERVER_TOKEN",
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    code_version: "1.0.0",
  },
});

const myFunction = () => {
  throw new CustomError("Error inside myFunction");
};

class CustomError extends Error {
  constructor(message = "", ...args) {
    super(message, ...args);
    this.name = "CustomError";
    this.message = message + ". This is a custom Error";
    /** This field is not displayed in the rollbar logs */
    this.extraField = "Some more custom information about the bug";
  }
}

// log a generic message and send to rollbar
try {
  myFunction();
} catch (e) {
  rollbar.error("Hello everyone, i'm a bug", e, {
    extraInfo: "some extra information about the bug",
  });
}
