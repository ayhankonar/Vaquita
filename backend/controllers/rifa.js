const Rifa = require("../models/Rifa");
const User = require("../models/User");
const mercadopago = require("../config/mercadopago")
const Ticket = require("../models/Ticket")

exports.getUserRifas = async (req, res) => {
  const { user: { id } } = req
  const { rifas } = await User.findById(id).populate('rifas')
   
  res.status(200).json(rifas)
}

exports.createRifa = async (req, res) => {
  const {
    ticketPrice,
    availableTickets,
    title,
    description,
    productPrice,
    productName,
    imageProduct,
    ownerID
    } = req.body
  const { user: { id } } = req
  const newRifa = await Rifa.create({
    title,
    description,
    productPrice,
    productName,
    imageProduct,
    ticketPrice,
    availableTickets,
    ownerID: id
  })

  await User.findByIdAndUpdate(id, { $push: { rifas : newRifa._id } })
  res.status(201).json(newRifa)
}

exports.getAllRifas = async (req, res) => {
  //PARA NO RENDERIZAR LAS RIFAS DE USUARIO EN HOME (SI HAY USUARIO)
  if (req.user) {
    const { user: { id } } = req 
    const results = await Rifa.find({$and:[{ownerID: {$ne: id}},{finished: false},{availableTickets: {$gt:0}}]})
    //Rifa.find({$and:[{_id: ticket.rifaTicket},{finished: true}]})
    const allResults = results.reverse()
    res.status(200).json(allResults)
  //MOSTRAR TODAS RIFAS CUANDO NO HAYA USUARIO
  } else {
    const result = await Rifa.find({$and: [{finished: false},{availableTickets: {$gt:0}}]})
    const allRifas = result.reverse()
    res.status(200).json(allRifas)
  }
}

exports.getRifaDetails = async (req, res) => {
    const { rifaId } = req.params
    const rifa = await Rifa.findById(rifaId)
  
    res.status(200).json(rifa)
  }

exports.updateRifa = async (req, res) => {
     const { rifaId } = req.params
     const {
        ticketPrice,
        availableTickets,
        title,
        description,
        productPrice,
        productName,
        imageProduct,
        ownerID
        } = req.body
      const { user: { id } } = req
      const updatedRifa = await Rifa.findByIdAndUpdate(rifaId, {
        title,
        description,
        productPrice,
        productName,
        imageProduct,
        ticketPrice,
        availableTickets,
        ownerID: id
      }, { new:true })

      res.status(200).json(updatedRifa)
 } 

exports.deleteRifa =  async (req, res) => {
    const { rifaId } = req.params
    await Rifa.findByIdAndDelete(rifaId)
    res.status(200).json({ message: 'rifa deleted' })
  }


exports.checkRifa = async(req,res) => {
  const {rifaId} = req.params
  const { user: { id } } = req
  const { soldTickets } = await Rifa.findById(rifaId).populate('soldTickets')
  
  if(soldTickets.find(tix =>tix.owner == id)){
    res.status(200).json(true)
  } else {
    res.status(200).json(false)
  }
}
  
exports.boughtTicket = async (req, res) => {
  const { rifaId } = req.params
  const rifa = await Rifa.findOne({ _id: rifaId })
  
  // 1. Generar el ticket
  const ticket = await Ticket.create({
    owner: req.user._id,
    rifaTicket: rifaId
  })
  // 2. restar un ticket de la rifa
  // 3. Agregar el ticket a los tickets vendidos de la rifa
  rifa.availableTickets--
  rifa.soldTickets.push(ticket._id)
  
  await rifa.save()
  // 4. Agregamos el ticket al user
  await User.findByIdAndUpdate(req.user.id, { $push: { tickets: ticket._id } })

  // 5. Si hay 0 tickets, cambiamos la propiedad finished de la rifa a true
  if (rifa.availableTickets === 0) {
    await Rifa.findByIdAndUpdate(rifaId, {finished:true}, {new: true})
    const winnerId = Math.floor(Math.random() * rifa.soldTickets.length)
    //ObjectId de Ticket
    const ticketWinner = rifa.soldTickets[winnerId]
    console.log("winner:", ticketWinner)
    //cambiar la propiedad winner del ticket seleccionado de forma aleatoria por true
    await Ticket.findByIdAndUpdate(ticketWinner, { winner: true }, {new: true})
    //redirigir a la misma vista de end rifas
    res.status(201).json(ticketWinner)
    }
    res.status(200).json(ticket)
}