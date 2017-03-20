const LGAuth = require('@learnersguild/idm-jwt-auth/lib/middlewares')

if ( !process.env.JWT_PUBLIC_KEY ) {
  throw new Error(`You do not have a JWT_PUBLIC_KEY in your .env. Please add it.`)
}

module.exports = server => {
  server.use(LGAuth.addUserToRequestFromJWT)

  server.use((req, res, next) => {
    console.log('AUTH', {user: req.user})
    next()
  })
  // server.use((req, res, next) => {
  //   LGAuth.refreshUserFromIDMService(req, res, (error) => {
  //     if (error) {
  //       // this is not enough to break things -- if we are unable to refresh the
  //       // user from IDM, but our JWT is still valid, it's okay, so we won't
  //       // allow this error to propagate beyond this point
  //       console.warn('WARNING: unable to refresh user from IDM service:', error)
  //     }
  //     next()
  //   })
  // })

  // server.use(LGAuth.extendJWTExpiration)
}
