import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faKey, faAddressCard } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Input from '../Input/Input'
import './Register.scss'

class Register extends Component {
    constructor() {
        super()

        this.state = {
            username: '',
            password: '',
            email: '',
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleSubmit(e) {
        e.preventDefault()

        axios
            .post('/auth/register', this.state)
            .then((res) => {
                console.log(res.data)
                this.props.history.push('/')
            })
            .catch((err) => console.log(err))
    }

    render() {
        console.log(this.props)
        return (
            <div className='register'>
                <h1>Create an account</h1>
                <form className='register__form' onSubmit={(e) => this.handleSubmit(e)}>
                    <div className='register__input-field'>
                        <div className='register__input-field--icon'>
                            <FontAwesomeIcon icon={faUser} size='2x' color='salmon' />
                        </div>
                        <Input
                            class='primary'
                            type='text'
                            required='required'
                            placeholder='username'
                            name='username'
                            change={this.handleChange}
                        />
                    </div>
                    <div className='register__input-field'>
                        <div className='register__input-field--icon'>
                            <FontAwesomeIcon icon={faAddressCard} size='2x' color='salmon' />
                        </div>
                        <Input
                            class='primary'
                            type='text'
                            required='required'
                            placeholder='email'
                            name='email'
                            change={this.handleChange}
                        />
                    </div>
                    <div className='register__input-field'>
                        <div className='register__input-field--icon'>
                            <FontAwesomeIcon icon={faKey} size='2x' color='salmon' />
                        </div>
                        <Input
                            class='primary'
                            type='password'
                            require='required'
                            name='password'
                            placeholder='password'
                            change={this.handleChange}
                        />
                    </div>
                    <Input class='submit' type='submit' value='register' />
                </form>
            </div>
        )
    }
}

export default Register
