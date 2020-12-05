import axios from 'axios'

const prefix = '/api/rifas'

const baseURL = process.env.NODE_ENV === 'development' ?
  `http://localhost:3000${prefix}` : prefix

const rifasService = axios.create({
  baseURL,
  // Agregamos with credentials por que el recurso de jobs utiliza al usuario en sesion.
  withCredentials: true
})

// Obtener las rifas del user
export const getUsrRifas = () => rifasService.get('/myrifas')

// Obtener todas las rifas
export const getAllRifas = () => rifasService.get()

// Obtener el detalle de una rifa
export const getRifaDetails = (id, rifa) => rifasService.get(`/${id}`, rifa)

// Crear una rifa
export const createRifa = rifa => rifasService.post('/new', rifa)

// Editar una rifa
export const editRifa = (id, rifa) => rifasService.put(`/${id}`, rifa)

//Borrar una rifa
export const deleteRifa = id => rifasService.delete(`/${id}`)

//Comprar ticket
export const buyTicket = (id) => rifasService.post(`/bought-ticket/${id}`)