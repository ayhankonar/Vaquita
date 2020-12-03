const { Schema, model } = require("mongoose")

const rifaSchema = new Schema(
  {
    title: String,
    description: String,
    productPrice: Number,
    ownerID: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    productName: String,
    imageProduct: {
        type: String,
        default: "https://piotrkowalski.pw/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png"
    },
    availableTickets: {
      type: Number,
      default: 20
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