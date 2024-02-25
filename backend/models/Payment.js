const mongoose = require("mongoose");

//schema
const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reference: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
      required: true,
    },
    subscriptionPlan: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      default: 0,
    },
    monthlyRequestCount: {
      type: Number,
      required: true,
    },
    apiRequestCount: {
      type: Number,
      default: 0,
    },
    monthlyRequestCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, //provides timestamps with each query
  }
);

//compile to form the model
const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
