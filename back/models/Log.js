const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userName: {
    type: String,
  },
  userEquipe: {
    type: String,
  },
  userSetor: {
    type: String,
  },
  action: {
    type: String,
    enum: ["create", "update", "delete"],
  },
  entity: {
    type: String,
    enum: ["Ordem"],
  },
  entityId: {
    type: String,
  },
  details: {
    type: String,
  },
});

const Log = mongoose.model("Log", logSchema);

module.exports = Log;
