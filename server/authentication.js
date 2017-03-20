const LGAuth = require('@learnersguild/idm-jwt-auth/lib/middlewares')

if ( !process.env.JWT_PUBLIC_KEY ) {
  throw new Error(`You do not have a JWT_PUBLIC_KEY in your .env. Please add it.`)
}

module.exports = server => {
  server.use(LGAuth.addUserToRequestFromJWT)
}
