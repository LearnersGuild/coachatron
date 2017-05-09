import React from 'react'
import SimpleReactRouter from 'simple-react-router'

// Pages
import NotFoundPage   from './components/pages/NotFoundPage'
import HomePage       from './components/pages/HomePage'

export default class Router extends SimpleReactRouter {
  getRoutes(map, props){
    map('/',       HomePage)
    map('/:path*', NotFoundPage)
  }
}
