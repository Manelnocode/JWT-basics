const CustomAPIerror = require('./custom-error')
const badRequest = require('./bad-request')
const unauthenticatedError = require('./unauthenticated')
const CustomAPIError = require('./custom-error')


module.exports({
    CustomAPIError,
    badRequest,
    unauthenticatedError
})