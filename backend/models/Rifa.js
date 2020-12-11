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
        default: "https://res.cloudinary.com/dj9edroyv/image/upload/v1607702415/Vaquita/jswo1h6qtpsajcrvxhax.png"
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