const router = require('express').Router();
const {createRifa, getAllRifas, getRifaDetails, updateRifa, deleteRifa, getUserRifas} = require ('../controllers/rifa')
const {catchErrs, isAuth} = require ('../middlewares/index')


// router.get('/', (req, res, next) => {
//   res.status(200).json({ msg: 'Working' });
// });

//* GET home page *//
router.get('/rifas', getAllRifas)



//* Rifas routes *//
router.get('/rifas/myrifas', isAuth, catchErrs(getUserRifas));
router.post('/rifas/new', isAuth, catchErrs(createRifa))
// router.get('/rifas(:rifaId', catchErrs(getRifaDetails))
router.put('/rifas/:rifaId', isAuth, catchErrs(updateRifa))
router.delete('/rifas/:rifaId', catchErrs(deleteRifa))

module.exports = router;
