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
    price: ticketPrice,
    ticketQuantity: availableTickets,
    title,
    description,
    productPrice,
    productName,
    imageProduct,
    ownerID
    // availableTickets,
    // totalTickets: availableTickets,
    } = req.body
  const { user: { id } } = req
//   const { productId: product } = req.params
  const newRifa = await Rifa.create({
    title,
    description,
    productPrice,
    productName,
    imageProduct,
    ticketPrice,
    availableTickets,
    // totalTickets: availableTickets,
    ownerID: id
  })

  await User.findByIdAndUpdate(id, { $push: { rifas : newRifa._id } })
//   await Product.findByIdAndUpdate(product, { valid: true })
///no estoy segura de esto///
  res.status(201).json(newRifa)
}

exports.getAllRifas = async (req, res) => {
  const result = await Rifa.find().populate("rifa")
  const allRifas = result.reverse()
  res.status(200).json(allRifas)
}


exports.getRifaDetails = async (req, res) => {
    const { rifaId } = req.params
    const rifa = await Rifa.findById(rifaId)
  
    res.status(200).json(rifa)
  }

exports.updateRifa = async (req, res) => {
     const { rifaId } = req.params
     const {
        // price: ticketPrice,
        // ticketQuantity: availableTickets,
        ticketPrice,
        availableTickets,
        title,
        description,
        productPrice,
        productName,
        imageProduct,
        ownerID,
       
        } = req.body
      const updatedRifa = await Rifa.findByIdAndUpdate(rifaId, {
        title,
        description,
        productPrice,
        productName,
        imageProduct,
        ticketPrice,
        availableTickets,
        // totalTickets: availableTickets,
        ownerID,
      }, { new:true })

      res.status(200).json(updatedRifa)
 } 

exports.deleteRifa =  async (req, res) => {
    const { rifaId } = req.params
    await Rifa.findByIdAndDelete(rifaId)
    res.status(200).json({ message: 'rifa deleted' })
  }

////////////
  
exports.boughtTicket = async (req, res) => {
  const { rifaId } = req.params
  console.log(req.user._id, "USER")
  console.log(rifaId, "RIFAID")
  const rifa = await Rifa.findOne({ _id: rifaId })
  
  // 1. Generar el ticket
  const ticket = await Ticket.create({
    owner: req.user._id,
    rifaTicket: rifaId
  })
  // 2. restar un ticket de la rifa
  // 3. Agregar el ticket a los tickets vendidos de la rifa
  rifa.availableTickets--
  console.log(rifa.availableTickets, "AVAILABLE TICKETS")
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
   // res.status(403).json({msg: 'No more tickets'})
  }
  res.status(200).json(ticket)
  // if (rifa.finished === true){
  //   //obtener a un ganador aleatorio de los soldTickets de la rifa
  //   const winnerId = Math.floor(Math.random() * rifa.soldTickets.length)
  //   //ObjectId de Ticket
  //   const ticketWinner = rifa.soldTickets[winnerId]
  //   console.log("winner:", ticketWinner)
  //   //cambiar la propiedad winner del ticket seleccionado de forma aleatoria por true
  //   await Ticket.findByIdAndUpdate(ticketWinner, { winner: true })
  //   //redirigir a la misma vista de end rifas
  //   res.status(201).json(ticketWinner)
  // }
}

// exports.endRifas = async (req, res) => {
//   const rifas = await Rifa.find({
//     availableTickets: 0,
//     finished: false
//   }).populate("product")
//   res.render("rifa/end", { rifas })
//   ///CAMBIAR ESTO ^^^^
// }



exports.setRifaWinner = async (req, res) => {
  const { rifaId } = req.params
  const rifa = await rifa.findById(rifaId).populate("soldTickets")
  // 1. obtener a un ganador aleatorio de los soldTickets de la rifa
  const winnerId = Math.floor(Math.random() * rifa.soldTickets.length)
  const ticketWinner = rifa.soldTickets[winnerId]
  console.log("winner:", ticketWinner)
  // 2. cambiar la propiedad winner del ticket seleccionado de forma aleatoria por true
  await Ticket.findByIdAndUpdate(ticketWinner, { winner: true })
  // 3. Enviar el roadster que diego prometio al ganador.
  // 4. cambiar la propiedad finished de la rifa por true
  await rifa.findByIdAndUpdate(rifaId, { finished: true })
  // 5. redirigir a la misma vista de end rifas
  res.redirect("/rifas/end")
  //////CAMBIAR ESTO^^^^
}