//check username, password in post (login) request
// if exist create new JWT
// send back to front end

// setup authentication so only the request with JWT can acces the dashboard




const jwt = require('jsonwebtoken')
const {badRequest,CustomAPIError} = require('../errors/index')





const login = async (req,res) => {
    const {username, password} = req.body
    console.log(username, password)
    
    if(!username || !password){
        throw new badRequest('please provide email and password')
    }
    // just for demo, nomarlly provided by database
const id = new Date().getDate()

//try to keep the payload small, better experience for user
const token = jwt.sign({id, username},process.env.JWT_SECRET,{expiresIn:'30d'})

res.status(200).json({msg: 'user created',token})
}


// ESTA PARTE DEL CODIGO DE DASHBOARD VA A SER REFACTORIZADA COMO MIDDLEWARE YA QUE AHORA LA FUCNIONALIDAD ESTA BIEN PERO SI TUVIESEMOS MUCHAS PAGINAS, NO SERIA SOSTENIBLE TENER QUE REPETIR EL CODIGO Y CONTENTIDO PARA CADA UNA DE ELLAS. (mirar en middlware auth)


const dashboard = async (req,res) => { 

    const luckyNumber = Math.floor(Math.random()*100)

    res.status(200).json({msg: `Hello, ${req.user.username}', secret: ' Herre is your authorized data, your lucky number is ${luckyNumber}` })

    
}

module.exports = {
    login,dashboard
}