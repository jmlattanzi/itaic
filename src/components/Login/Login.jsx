import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { login, getCurrentUser } from '../../redux/userReducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faSearch,
    faUser,
    faKey,
    faAddressCard,
} from '@fortawesome/free-solid-svg-icons'
import Input from '../Input/Input'
import Button from '../Button/Button'
import './Login.scss'

class Login extends Component {
    constructor() {
        super()

        this.state = {
            modalIsOpen: false,
            user: {
                username: '',
                password: '',
                id: 0,
            },
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                [e.target.name]: e.target.value,
            },
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        const { username, password } = this.state.user
        this.props.login(username, password)
    }

    render() {
        return (
            <div className='login'>
                <FontAwesomeIcon
                    icon={faAddressCard}
                    size='4x'
                    color='salmon'
                />
                <h1 className='login__modal__header'>Login</h1>
                <form
                    className='login__modal__login'
                    onSubmit={(e) => this.handleSubmit(e)}>
                    <div className='login__modal__input-field'>
                        <FontAwesomeIcon
                            icon={faUser}
                            size='lg'
                            color='salmon'
                        />
                        <Input
                            required='required'
                            class='primaryInput'
                            type='text'
                            placeholder='username'
                            name='username'
                            change={this.handleChange}
                        />
                    </div>
                    <div className='login__modal__input-field'>
                        <FontAwesomeIcon
                            icon={faKey}
                            size='lg'
                            color='salmon'
                        />
                        <Input
                            required='required'
                            class='primaryInput'
                            type='password'
                            placeholder='password'
                            name='password'
                            change={this.handleChange}
                        />
                    </div>
                    <Input class='submit' type='submit' value='login' />
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => state

export default connect(
    mapStateToProps,
    { login }
)(Login)
