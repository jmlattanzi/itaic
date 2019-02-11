import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import axios from 'axios'
import { isMobile } from 'react-device-detect'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUser, faKey, faSpinner } from '@fortawesome/free-solid-svg-icons'
import './Header.scss'

Modal.setAppElement('#root')

class Header extends Component {
    constructor() {
        super()

        this.state = {
            modalIsOpen: false,
            loggedIn: false,
            user: {
                username: '',
                password: '',
            },
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    openModal() {
        this.setState({ modalIsOpen: true })
    }

    closeModal() {
        this.setState({ modalIsOpen: false })
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
        console.log(this.state.user)
        axios
            .post('/auth/login', this.state.user)
            .then((res) => {
                this.closeModal()
                this.setState({
                    loggedIn: true,
                })
            })
            .catch((err) => console.log('error caught: ', err))
    }

    render() {
        return (
            <div className='header'>
                <Link className='header__logo' to='/'>
                    <h1>
                        <em>ITAIC</em>
                    </h1>
                </Link>
                <div className='header__links'>
                    {this.state.loggedIn ? (
                        <h1>{this.state.user.username}</h1>
                    ) : (
                        <div>
                            <FontAwesomeIcon icon={faSearch} size='lg' />
                            <input
                                className='header__search'
                                type='text'
                                placeholder='search'
                            />
                            {!isMobile ? (
                                <button
                                    className='header__login'
                                    onClick={this.openModal}>
                                    <h3>login</h3>
                                </button>
                            ) : (
                                <Link className='header__login' to='/login'>
                                    login
                                </Link>
                            )}
                        </div>
                    )}
                </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    className='modal'>
                    <h1>Login</h1>
                    <form
                        className='modal__login'
                        onSubmit={(e) => this.handleSubmit(e)}>
                        <div className='modal__input-field'>
                            <FontAwesomeIcon icon={faUser} size='lg' />
                            <input
                                required
                                className='modal__input'
                                type='text'
                                name='username'
                                placeholder='username or email'
                                onChange={(e) => this.handleChange(e)}
                            />
                        </div>
                        <div className='modal__input-field'>
                            <FontAwesomeIcon icon={faKey} size='lg' />
                            <input
                                required
                                className='modal__input'
                                type='password'
                                name='password'
                                placeholder='password'
                                onChange={(e) => this.handleChange(e)}
                            />
                        </div>
                        <input
                            className='modal__submit'
                            type='submit'
                            value='login'
                        />
                    </form>
                </Modal>
            </div>
        )
    }
}

export default Header
