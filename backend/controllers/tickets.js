const Rifa = require("../models/Rifa");
const User = require("../models/User");
const mercadopago = require("../config/mercadopago");
const Ticket = require("../models/Ticket");


exports.getUserTickets = async (req, res) => {
    const { user: { id } } = req
    const { tickets } = await User.findById(id).populate('tickets')
     
    res.status(200).json(tickets)
}
