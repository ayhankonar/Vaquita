const { Schema, model } = require('mongoose');
const PLM = require('passport-local-mongoose');

const userSchema = new Schema(
  {
    email: String,
    userName: String,
    firstName: String,
    lastName: String,
    googleID: String,
    city: String,
    country: String,
    image: {
      type: String,
      default: 'https://res.cloudinary.com/dj9edroyv/image/upload/v1607702436/Vaquita/lxvo7wzoriugvszkl2pj.png'
    },
    rifas: [{
      type: Schema.Types.ObjectId,
      ref: 'Rifa'
    }],
    tickets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Ticket"
      }
    ],
  },
  {
    timestamps: true,
    versionKey: false
  }
);

userSchema.plugin(PLM, { usernameField: 'email' });

module.exports = model('User', userSchema);
