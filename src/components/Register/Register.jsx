import React, { Component } from 'react'
import './Register.scss'

class Register extends Component {
    constructor() {
        super()

        this.state = {
            username: '',
            password: '',
            email: ''
        }
    }

    render() {
        return (
            <div className='register'>
                <h1>Register</h1>
            </div>
        )
    }
}

export default Register
