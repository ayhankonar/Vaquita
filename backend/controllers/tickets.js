const Rifa = require("../models/Rifa");
const User = require("../models/User");
const mercadopago = require("../config/mercadopago");
const Ticket = require("../models/Ticket");


exports.getUserTickets = async (req, res) => {
    const { user: { id } } = req
    const { tickets } = await User.findById(id).populate('tickets')

    //TICKET DE USUARIO
    res.status(200).json(tickets)
}

// exports.getRifaFromTicket = async (req, res) => {
//     const { user: {id}} = req
//     let rifas = []
//     const { tickets } = await User.findById(id).populate('tickets')
//     for (const ticket of tickets){
//         let rifa = await Rifa.findById(ticket.rifaTicket)
//         rifas.push(rifa)
//     }
//     res.status(200).json(rifas)


// }

exports.getRifaFromWinnerTicket = async (req, res) => {
    const { user: {id}} = req
    
    let rifas = []
    // const { tickets } = await User.(id).populate('tickets')
    const tickets  = await Ticket.find({$and:[{owner: id},{winner: true}]})
    console.log('WINNER TICKETS', tickets)
    console.log('test')
    for (const ticket of tickets){
        let rifa = await Rifa.findById(ticket.rifaTicket)
        rifas.push(rifa)
    }
    const reversedRifas = rifas.reverse()
    res.status(200).json(reversedRifas)
}

exports.getRifaFromTicket = async (req, res) => {
    const { user: {id}} = req
    let rifas = []
    // const { tickets } = await User.(id).populate('tickets')
    const tickets = await Ticket.find({$and:[{owner: id},{winner: false}]})
    console.log('LOSER TICKETS',tickets)
    for (const ticket of tickets){
        let rifa = await Rifa.findById(ticket.rifaTicket)
        rifas.push(rifa)
    }
    const reversedRifas = rifas.reverse()
    res.status(200).json(reversedRifas)
}

