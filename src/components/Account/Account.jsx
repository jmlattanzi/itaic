import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserPosts, deletePost } from '../../redux/postReducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons'
import Posts from '../Posts/Posts'
import './Account.scss'

class Account extends Component {
    constructor(props) {
        super(props)

        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount() {
        this.props.getUserPosts(this.props.match.params.id)
    }

    handleDelete(id) {
        this.props.deletePost(id)
    }

    render() {
        // console.log('Account props ==>', this.props)
        return (
            <div className='account'>
                <div>
                    <h1>account bio and stats</h1>
                </div>
                <h3>{this.props.ur.op.username}</h3>
                <div className='account__grid'>
                    {/* this could really just be a filter, I bet it would even be faster */}
                    {this.props.pr.userPosts.length !== 0 ? (
                        this.props.pr.loading ? (
                            this.props.pr.userPosts
                                .sort((x, y) => x.id < y.id)
                                .map((post) => (
                                    <div key={post.id}>
                                        <Posts
                                            post_id={post.id}
                                            username={post.username}
                                            user_id={post.user_id}
                                            image={post.image_url}
                                            caption={post.caption}
                                        />
                                        {this.props.ur.user.id ==
                                        this.props.match.params.id ? (
                                            <FontAwesomeIcon
                                                icon={faTimes}
                                                size='2x'
                                                color='#ccc'
                                                onClick={(id) =>
                                                    this.handleDelete(post.id)
                                                }
                                            />
                                        ) : null}
                                    </div>
                                ))
                        ) : (
                            <div className='account__loading'>
                                <FontAwesomeIcon
                                    icon={faSpinner}
                                    spin
                                    size='8x'
                                />
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
    { getUserPosts, deletePost }
)(Account)
