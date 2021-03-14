const router = require('express').Router();

const CarsController = require('../controllers/CarsController');

router.get('/cars', CarsController.index);
router.post('/cars', CarsController.create);

module.exports = router;