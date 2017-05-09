import './index.sass'
import React, { Component } from 'react'
import Link from '../../atoms/Link'

export default class NotFoundPage extends Component {
  render(){
    return <div className="NotFoundPage">
      <h1 className="NotFoundPage-NotFound">Page Not Found</h1>
      <h2>{this.props.location.pathname}</h2>
      <p>
        <span>Maybe you should </span>
        <Link href="/">Go Home</Link>
        <span>?</span>
      </p>
      <p>
        <span>Or if you think you got this error by mistake </span>
        <Link href="https://github.com/LearnersGuild/coachatron/issues/new">Click here to file and issue!</Link>
      </p>
    </div>
  }
}
