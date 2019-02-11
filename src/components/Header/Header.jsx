import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import axios from 'axios'
import { isMobile } from 'react-device-detect'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faSearch,
    faUser,
    faKey,
    faAddressCard,
} from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { getCurrentUser } from '../../redux/reducer'
import Button from '../Button/Button'
import Input from '../Input/Input'
import Form from '../Form/Form'
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
        this.logout = this.logout.bind(this)
    }

    componentDidMount() {
        axios
            .get('/auth/current')
            .then((res) => {
                if (res.data.username) {
                    console.log(res.data.username)
                    this.setState({
                        ...this.state,
                        loggedIn: true,
                        user: {
                            ...this.state.user,
                            username: res.data.username,
                        },
                    })
                }
            })
            .catch((err) => console.log('Not logged in', err))
    }

    logout() {
        axios.post('/auth/logout', {}).then((res) =>
            this.setState({
                loggedIn: false,
                user: {
                    ...this.state.user,
                    username: '',
                    password: '',
                },
            })
        )
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
                    user: {
                        ...this.state.user,
                        password: '',
                    },
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
                {this.state.loggedIn ? (
                    <div>
                        <Link className='header__account_name' to='/account'>
                            <h1>{this.state.user.username}</h1>
                        </Link>
                        <Button class='login' click={this.logout}>
                            logout
                        </Button>
                    </div>
                ) : (
                    <div className='header__links'>
                        <FontAwesomeIcon icon={faSearch} size='lg' />
                        <Input
                            class='searchInput'
                            type='text'
                            placeholder='search'
                        />
                        {!isMobile ? (
                            <Button class='primary' click={this.openModal}>
                                login
                            </Button>
                        ) : (
                            <Link className='header__login' to='/login'>
                                login
                            </Link>
                        )}
                    </div>
                )}
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    className='modal'>
                    <FontAwesomeIcon icon={faAddressCard} size='4x' />
                    <h1 className='modal__header'>Login</h1>
                    <form
                        className='modal__login'
                        onSubmit={(e) => this.handleSubmit(e)}>
                        <div className='modal__input-field'>
                            <FontAwesomeIcon icon={faUser} size='lg' />
                            <Input
                                required='required'
                                class='primaryInput'
                                type='text'
                                placeholder='username'
                                name='username'
                                change={this.handleChange}
                            />
                        </div>
                        <div className='modal__input-field'>
                            <FontAwesomeIcon icon={faKey} size='lg' />
                            <Input
                                required='required'
                                class='primaryInput'
                                type='password'
                                placeholder='password'
                                name='password'
                                change={this.handleChange}
                            />
                        </div>
                        <Input
                            class='submitInput'
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
