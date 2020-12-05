const { Schema, model } = require("mongoose")

const ticketSchema = new Schema(
  {
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    winner: {
        type: Boolean,
        default: false
    },
    rifaTicket: {
      type: Schema.Types.ObjectId,
      ref: "Rifa"
    }
  },
  { timestamps: true }
)
module.exports = model("Ticket", ticketSchema)