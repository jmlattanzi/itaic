import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserPosts, deletePost } from '../../redux/postReducer'
import { getAccount } from '../../redux/userReducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faTimes, faEdit } from '@fortawesome/free-solid-svg-icons'
import Button from '../Button/Button'
import Posts from '../Posts/Posts'
import './Account.scss'

class Account extends Component {
    constructor(props) {
        super(props)

        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount() {
        this.props.getUserPosts(this.props.match.params.id)
        this.props.getAccount(this.props.match.params.id)
    }

    handleDelete(id) {
        this.props.deletePost(id)
    }

    render() {
        console.log('Account', this.props)
        return (
            <div className='account'>
                <div className='account__header'>
                    <div className='account__header__avatar'>
                        <img src={this.props.ur.account.avatar_url} alt='pfp' />
                    </div>
                    <div className='account__header__user'>
                        <h3>{this.props.ur.account.username}</h3>
                        <div className='account__header__bio'>{this.props.ur.account.bio}</div>
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
                        this.props.pr.loading ? (
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
