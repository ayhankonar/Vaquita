const { Schema, model } = require("mongoose")

const rifaSchema = new Schema(
  {
    title: String,
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product"
    },
    availableTickets: {
      type: Number,
      default: 10
    },
    participants: {
      type: Number,
      default: 20
    },
    ownerID: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    ticketPrice: Number,
    soldTickets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Ticket"
      }
    ],
    finished: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

module.exports = model("Rifa", rifaSchema)