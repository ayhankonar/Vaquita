const router = require('express').Router();
const {createRifa, getAllRifas, getRifaDetails, updateRifa, deleteRifa, getUserRifas, boughtTicket, checkRifa} = require ('../controllers/rifa')
const {getUserTickets, getRifaFromTicket, getRifaFromWinnerTicket, getRifaFromLostTicket} = require ('../controllers/tickets')
const {catchErrs, isAuth} = require ('../middlewares/index');

//* GET home page *//
router.get('/rifas', getAllRifas)

//* Rifas routes *//
router.get('/rifas/myrifas', isAuth, catchErrs(getUserRifas));
router.post('/rifas/new', isAuth, catchErrs(createRifa))
router.get('/rifas/:rifaId', catchErrs(getRifaDetails))
router.put('/rifas/:rifaId', isAuth, catchErrs(updateRifa))
router.delete('/rifas/:rifaId', isAuth, catchErrs(deleteRifa))

//TICKETS
router.post('/tickets/bought-ticket/:rifaId', boughtTicket)
router.get('/tickets/mytickets', isAuth, getUserTickets)

//Rifas abiertas, que pertenecen al ganador 
router.get('/tickets/rifas', getRifaFromTicket)
//Rifas cerradas, que el usuario ganó
router.get('/tickets/winner-rifas', getRifaFromWinnerTicket)
//Rifas cerradas, que el usuario no ganó
router.get('/tickets/lost-rifas', getRifaFromLostTicket)

router.get('/tickets/:rifaId', checkRifa)

//MERCADOPAGO
router.get('/', (req, res, next) => {
  res.status(200).json({ msg: 'Working' });
});



module.exports = router;
