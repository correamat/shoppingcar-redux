const router = require('express').Router();

const CarsController = require('../controllers/CarsController');
const LoginController = require('../controllers/loginController');

router.get('/cars', CarsController.index);
router.post('/cars', CarsController.create);

router.post('/login', LoginController.login);

module.exports = router;