import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Post from './components/Posts/Post/Post'
import Account from './components/Account/Account'

export default (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/post/:id' component={Post} />
        <Route path='/account/:id' component={Account} />
    </Switch>
)
