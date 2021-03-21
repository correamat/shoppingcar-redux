const router = require('express').Router();

const CarsController = require('../controllers/CarsController');
const LoginController = require('../controllers/loginController');
const UserController = require('../controllers/UserController');

router.get('/cars', CarsController.index);
router.post('/cars', CarsController.create);

router.get('/user', UserController.index);
router.post('/user', UserController.create);

router.post('/login', LoginController.login);

module.exports = router;