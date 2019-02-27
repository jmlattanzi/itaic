import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserPosts, deletePost } from '../../redux/postReducer'
import { getAccount } from '../../redux/userReducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faTimes, faEdit } from '@fortawesome/free-solid-svg-icons'
import { isMobile } from 'react-device-detect'
import Modal from 'react-modal'
import Button from '../Button/Button'
import Input from '../Input/Input'
import Posts from '../Posts/Posts'
import './Account.scss'

class Account extends Component {
    constructor(props) {
        super(props)

        this.state = {
            file: {},
            modalIsOpen: false,
            edit: false,
            newBio: '',
        }

        this.handleDelete = this.handleDelete.bind(this)
        this.handleFileChange = this.handleFileChange.bind(this)
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.upload = this.upload.bind(this)
        this.changeBio = this.changeBio.bind(this)
        this.changeEdit = this.changeEdit.bind(this)
        this.handleBioChange = this.handleBioChange.bind(this)
    }

    componentDidMount() {
        this.props.getUserPosts(this.props.match.params.id)
        this.props.getAccount(this.props.match.params.id)
    }

    handleDelete(id) {
        this.props.deletePost(id)
    }

    handleFileChange(e) {
        this.setState({
            file: e.target.files[0],
        })
    }

    handleBioChange(e) {
        this.setState({
            newBio: e.target.value,
        })
    }

    openModal() {
        this.setState({ modalIsOpen: true })
    }

    closeModal() {
        this.setState({ modalIsOpen: false })
    }

    changeEdit() {
        this.setState({
            edit: !this.state.edit,
        })
    }

    changeBio(e) {
        e.preventDefault

        axios
            .put(`http://localhost:3001/users/bio/${this.props.match.params.id}`, {
                bio: this.state.newBio,
            })
            .then((res) => this.setState({ newBio: '', edit: false }))
            .catch((err) => console.log(err))
    }

    upload(e) {
        e.preventDefault()
        const data = new FormData(e.target)
        data.append('image', this.state.file)
        data.append('user_id', this.props.ur.user.id)

        if (this.props.ur.user.username !== undefined) {
            axios
                .post('/posts/avatar', data)
                .then((res) => window.alert('Profile successfully changed!'))
                .catch((err) => console.log(err))
        } else {
            console.log('You must be logged in to do this')
        }
    }

    render() {
        return (
            <div className='account'>
                <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
                    <form onSubmit={(e) => this.upload(e)}>
                        <label className='label'>choose file</label>
                        <Input type='file' class='primary' change={this.handleFileChange} />
                        <Input type='submit' value='submit' class='submit' />
                    </form>
                </Modal>
                <div className='account__header'>
                    {this.props.ur.user.id == this.props.match.params.id && !isMobile ? (
                        <div className='account__header__avatar' onClick={this.openModal}>
                            {this.props.ur.account.avatar_url !== null ? (
                                <img src={this.props.ur.account.avatar_url} alt='pfp' />
                            ) : (
                                <img src='https://via.placeholder.com/150' alt='pfp' />
                            )}
                        </div>
                    ) : (
                        <div className='account__header__avatar'>
                            {this.props.ur.account.avatar_url !== null ? (
                                <img src={this.props.ur.account.avatar_url} alt='pfp' />
                            ) : (
                                <img src='https://via.placeholder.com/150' alt='pfp' />
                            )}
                        </div>
                    )}

                    <div className='account__header__user'>
                        <h3>{this.props.ur.account.username}</h3>
                        <div className='account__header__bio'>
                            {!this.state.edit ? (
                                this.props.ur.account.bio
                            ) : (
                                <form onSubmit={(e) => this.changeBio(e)}>
                                    <Input
                                        type='text'
                                        class='primary'
                                        change={this.handleBioChange}
                                    />
                                    <Input type='submit' class='submit' value='submit' />
                                </form>
                            )}
                        </div>
                        {this.props.ur.user.id == this.props.match.params.id && !isMobile ? (
                            <FontAwesomeIcon
                                className='account__action'
                                icon={faEdit}
                                size='lg'
                                color='#ccc'
                                onClick={() => this.changeEdit()}
                            />
                        ) : null}
                    </div>
                    <div className='account__header__stats'>0 friends, lol</div>
                    {this.props.ur.user.id == this.props.match.params.id ? null : (
                        <div className='account__follow'>
                            <Button class='primary'>follow</Button>
                        </div>
                    )}
                </div>
                <div className='account__grid'>
                    {/* this could really just be a filter, I bet it would even be faster */}
                    {this.props.pr.userPosts.length !== 0 ? (
                        !this.props.pr.loading ? (
                            this.props.pr.userPosts
                                .sort((x, y) => x.id < y.id)
                                .map((post) => (
                                    <div className='account__grid-item' key={post.id}>
                                        <Posts
                                            post_id={post.id}
                                            username={post.username}
                                            user_id={post.user_id}
                                            image={post.image_url}
                                            caption={post.caption}
                                        />
                                        {this.props.ur.user.id == this.props.match.params.id ? (
                                            <div className='account__user-actions'>
                                                <FontAwesomeIcon
                                                    className='account__action'
                                                    icon={faTimes}
                                                    size='lg'
                                                    color='#ccc'
                                                    onClick={(id) => this.handleDelete(post.id)}
                                                />
                                                <Link to={`/post/${post.id}`}>
                                                    <FontAwesomeIcon
                                                        className='account__action'
                                                        icon={faEdit}
                                                        size='lg'
                                                        color='#ccc'
                                                    />
                                                </Link>
                                            </div>
                                        ) : null}
                                    </div>
                                ))
                        ) : (
                            <div className='account__loading'>
                                <FontAwesomeIcon icon={faSpinner} spin size='8x' />
                            </div>
                        )
                    ) : (
                        <div>
                            <h1>User has not posted yet!</h1>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => state

export default connect(
    mapStateToProps,
    { getUserPosts, deletePost, getAccount }
)(Account)
