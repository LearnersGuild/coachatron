process.env.NODE_ENV = process.env.NODE_ENV || 'development'

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'){
  const path = require('path')
  require('dotenv').load({
    path: path.resolve(__dirname, `../.env.${process.env.NODE_ENV}`)
  })
}
