//check username, password in post (login) request
// if exist create new JWT
// send back to front end

// setup authentication so only the request with JWT can acces the dashboard

const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors/custom-error')


// Hacemos una peticion post desde postman en la que enviamos un body con el nombre y la contraseña.
// Creamos un id y despues un token que contendra el id + usuario + secret con el que firmaremos el token y como respuesta enviaremos la linea 27. 


const login = async (req,res) => {
    const {username, password} = req.body
    console.log(username, password)
    if(!username || !password){
        throw new CustomAPIError('please provide email and password', 400)
    }
    // just for demo, nomarlly provided by database
const id = new Date().getDate()

//try to keep the payload small, better experience for user
const token = jwt.sign({id, username},process.env.JWT_SECRET,{expiresIn:'30d'})

res.status(200).json({msg: 'user created',token})
}




const dashboard = async (req,res) => {
    
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new CustomAPIError('No token provided',401)
    }

    const token = authHeader.split(' ')[1]
    
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        console.log(decoded);
    } catch (error) {
        throw new CustomAPIError('No authorized to acces this route',401)
    }
    

    const luckyNumber = Math.floor(Math.random()*100)
    res.status(200).json({msg: `Hello, John Doe', secret: ' Herre is your authorized data, your lucky number is ${luckyNumber}` })
}

module.exports = {
    login,dashboard
}