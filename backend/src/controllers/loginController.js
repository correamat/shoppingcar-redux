const service = require('../services/loginService')

class LoginController {

    constructor(loginService){
        this.loginService = loginService
    }

    login = (req, res) => {
        this.loginService.authenticate(req.body)
            .then(user => user ? res.status(201).json(user) : res.status(400).json({ return: false, message: 'Login ou senha inválidos'}))
                .catch(console.log)
    }
}

module.exports = new LoginController(service);