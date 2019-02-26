import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login, logout, getCurrentUser } from '../../redux/userReducer'
import { isMobile } from 'react-device-detect'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faSearch,
    faUser,
    faKey,
    faAddressCard,
    faSignOutAlt,
    faArrowCircleUp,
} from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal'
import Button from '../Button/Button'
import Input from '../Input/Input'
import './Header.scss'

Modal.setAppElement('#root')

class Header extends Component {
    constructor() {
        super()

        this.state = {
            modalIsOpen: false,
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
        this.register = this.register.bind(this)
    }

    componentDidMount() {
        this.props.getCurrentUser()
    }

    logout() {
        this.props.logout()
        window.location.reload()
    }

    register() {
        console.log(this.props)
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
        const { username, password } = this.state.user
        this.props.login(username, password)
        this.closeModal()
    }

    render() {
        return (
            <div style={{ width: '100%' }}>
                <div className='header'>
                    <Link className='header__logo' to='/'>
                        <h1>
                            <em>ITAIC</em>
                        </h1>
                    </Link>
                    {this.props.ur.user.username ? (
                        <div className='header__account'>
                            <FontAwesomeIcon
                                className='header__search'
                                icon={faSearch}
                                size='lg'
                                color='salmon'
                            />
                            <Input class='search' type='text' placeholder='search' />
                            <Link className='header__account_name' to='/upload'>
                                <FontAwesomeIcon icon={faArrowCircleUp} size='2x' color='salmon' />
                            </Link>
                            <Link
                                className='header__account_name'
                                to={`/account/${this.props.ur.user.id}`}>
                                <FontAwesomeIcon icon={faUser} size='2x' color='salmon' />
                            </Link>
                            <Link className='header__account_name' to='/logout'>
                                <FontAwesomeIcon icon={faSignOutAlt} size='2x' color='salmon' />
                            </Link>
                        </div>
                    ) : (
                        <div className='header__links'>
                            <FontAwesomeIcon
                                className='header__search'
                                icon={faSearch}
                                size='lg'
                                color='salmon'
                            />
                            <Input class='search' type='text' placeholder='search' />
                            {!isMobile ? (
                                <Button class='primary' click={this.openModal}>
                                    login
                                </Button>
                            ) : (
                                <Button class='primary' link path='/login'>
                                    login
                                </Button>
                            )}
                        </div>
                    )}
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        className='header__modal'>
                        <FontAwesomeIcon icon={faAddressCard} size='4x' color='salmon' />
                        <h1 className='header__modal__header'>Login</h1>
                        <form
                            className='header__modal__login'
                            onSubmit={(e) => this.handleSubmit(e)}>
                            <div className='header__modal__input-field'>
                                <FontAwesomeIcon icon={faUser} size='lg' color='salmon' />
                                <Input
                                    required='required'
                                    class='primary--animated'
                                    type='text'
                                    placeholder='username'
                                    name='username'
                                    change={this.handleChange}
                                />
                            </div>
                            <div className='header__modal__input-field'>
                                <FontAwesomeIcon icon={faKey} size='lg' color='salmon' />
                                <Input
                                    required='required'
                                    class='primary--animated'
                                    type='password'
                                    placeholder='password'
                                    name='password'
                                    change={this.handleChange}
                                />
                            </div>
                            <Input class='submit' type='submit' value='login' />
                        </form>
                        <p style={{ margin: '10px' }}>
                            <em>or</em>
                        </p>
                        <Button
                            class='primary'
                            path='/register'
                            link='true'
                            click={this.closeModal}>
                            register
                        </Button>
                    </Modal>
                </div>
                <hr className='header__bottom' />
            </div>
        )
    }
}

const mapStateToProps = (state) => state

export default connect(
    mapStateToProps,
    { login, logout, getCurrentUser }
)(Header)
