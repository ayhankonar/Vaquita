const router = require('express').Router();
// const { productDetail } = require('../controllers/products')
const {createRifa, getAllRifas, getRifaDetails, updateRifa, deleteRifa, getUserRifas, boughtTicket} = require ('../controllers/rifa')
const {getUserTickets, getRifaFromTicket, getRifaFromWinnerTicket} = require ('../controllers/tickets')
const {catchErrs, isAuth} = require ('../middlewares/index');
const { route } = require('./user');


// router.get('/', (req, res, next) => {
//   res.status(200).json({ msg: 'Working' });
// });

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
router.get('/tickets/rifas', getRifaFromTicket)
router.get('/tickets/winner-rifas', getRifaFromWinnerTicket)

//MERCADOPAGO
router.get('/', (req, res, next) => {
  res.status(200).json({ msg: 'Working' });
});

// router.get('/api/product', productDetail)


module.exports = router;
