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
      default: './public/images/profile.png'
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
