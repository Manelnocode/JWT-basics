
const jwt = require('jsonwebtoken')
const {unauthenticatedError} = require('../errors/index')



const authenticationMiddleware = async (req,res,next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new unauthenticatedError('No token provided')
    }

    const token = authHeader.split(' ')[1]
    
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        console.log(decoded);

        const {id,username} = decoded
        req.user = {id,username}

        next()

    } catch (error) {
        throw new unauthenticatedError('No authorized to acces this route')
    }
    
    
}

module.exports = authenticationMiddleware