const mongoose = require("mongoose");

const appSchema = mongoose.Schema(
  {
    appName: {
      type: String,
      required: true,
    },
    appLinkURL: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const appModel = mongoose.model("apps", appSchema);

module.exports = appModel;