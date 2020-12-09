import axios from 'axios'

const prefix = '/api/tickets'

const baseURL = process.env.NODE_ENV === 'development' ?
  `http://localhost:3000${prefix}` : prefix

const ticketsService = axios.create({
  baseURL,
  // Agregamos with credentials por que el recurso de jobs utiliza al usuario en sesion.
  withCredentials: true
})

// Obtener las rifas del user
export const getUsrTickets = () => ticketsService.get('/mytickets')

//Comprar ticket
export const buyTicket = (id) => ticketsService.post(`/bought-ticket/${id}`)

//Get rifas from user tickets
export const getRifafromTix = () => ticketsService.get('/rifas')

//Get winner rifas from user tickets
export const getRifafromWinnerTix = () => ticketsService.get('/winner-rifas')

export const getRifafromLostTix = () => ticketsService.get('/lost-rifas')