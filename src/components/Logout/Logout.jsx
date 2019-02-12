import React from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

const Logout = () => {
    axios
        .get('/auth/logout')
        .then(() => console.log('logged out'))
        .catch((err) => console.log(err))

    return <Redirect path to='/' />
}

export default Logout
