const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const User = require('../models/User');

const authenticate = async ({ username, password }) => {
    const user = await User.findOne({login: username, active: true}).select('+password');
    
    if(!user){
        return false;
    }

    if(!await bcryptjs.compare(password, user.password)){
        return false;
    }

    const token = await jwt.sign({ username }, 'olokinhomeu');

    delete user.password;

    return {
        token,
        user
    }
}

module.exports = {
    authenticate
};