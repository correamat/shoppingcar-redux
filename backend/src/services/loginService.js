const jwt = require('jsonwebtoken');

const db = [{ username: 'admin', password: 'admin' }]

const authenticate = async ({ username, password }) => {
    const user = await db.find(user => user.password === password && user.username === username);
    
    if(user){
        const token = await jwt.sign({ username }, 'olokinhomeu')

        return {
            token,
            user
        }
    }
}

module.exports = {
    authenticate
};