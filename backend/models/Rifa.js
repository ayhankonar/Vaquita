const { Schema, model } = require("mongoose")

const rifaSchema = new Schema(
  {
    title: String,
<<<<<<< HEAD
    description: String,
    productPrice: Number,
    ownerID: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    productName: {
      type: String,
      ref: "Product"
    },
    imageProduct: {
        type: String,
        default: "https://piotrkowalski.pw/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png"
    },
    availableTickets: {
      type: Number,
      default: 20
    },
=======
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
>>>>>>> parent of bf6866c8... auth attempt need to keep trying
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