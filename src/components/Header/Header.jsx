import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { login, getCurrentUser } from '../../redux/userReducer'
import { isMobile } from 'react-device-detect'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faSearch,
    faUser,
    faKey,
    faAddressCard,
} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
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
    }

    componentDidMount() {
        this.props.getCurrentUser()
        console.log('header props: ', this.props)
    }

    logout() {
        axios.post('/auth/logout', {}).then((res) =>
            this.setState({
                loggedIn: false,
                user: {
                    ...this.state.user,
                    username: '',
                    password: '',
                    id: 0,
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
        const { username, password } = this.state.user
        this.props.login(username, password)
        this.closeModal()
    }

    render() {
        return (
            <div className='header'>
                <Link className='header__logo' to='/'>
                    <h1>
                        <em>ITAIC</em>
                    </h1>
                </Link>
                {this.props.ur.user.username ? (
                    <div className='header__account'>
                        <FontAwesomeIcon
                            icon={faSearch}
                            size='lg'
                            color='salmon'
                        />
                        <Input
                            class='searchInput'
                            type='text'
                            placeholder='search'
                        />
                        <Link
                            className='header__account_name'
                            to={`/account/${this.props.ur.user.id}`}>
                            <FontAwesomeIcon
                                icon={faUser}
                                size='2x'
                                color='salmon'
                            />
                        </Link>
                        {/* <Button class='primary' click={this.logout}>
                            logout
                        </Button> */}
                    </div>
                ) : (
                    <div className='header__links'>
                        <FontAwesomeIcon
                            icon={faSearch}
                            size='lg'
                            color='salmon'
                        />
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
                    <FontAwesomeIcon
                        icon={faAddressCard}
                        size='4x'
                        color='salmon'
                    />
                    <h1 className='modal__header'>Login</h1>
                    <form
                        className='modal__login'
                        onSubmit={(e) => this.handleSubmit(e)}>
                        <div className='modal__input-field'>
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
                        <div className='modal__input-field'>
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

const mapStateToProps = (state) => state

export default connect(
    mapStateToProps,
    { login, getCurrentUser }
)(Header)
