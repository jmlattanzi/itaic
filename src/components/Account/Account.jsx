import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserPosts } from '../../redux/postReducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import Posts from '../Posts/Posts'
import './Account.scss'

class Account extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        console.log(this.props)
        this.props.getUserPosts(this.props.ur.user.id)
    }

    render() {
        return (
            <div className='account'>
                <div>
                    <h1>account bio and stats</h1>
                </div>
                <h3>{this.props.ur.user.username}</h3>
                <div className='account__grid'>
                    {this.props.pr.posts.length > 0 ? (
                        this.props.pr.posts
                            .sort((x, y) => x.id < y.id)
                            .map((post) => (
                                <Posts
                                    key={post.id}
                                    id={post.id}
                                    username={post.username}
                                    userId={post.user_id}
                                    image={post.image_url}
                                    caption={post.caption}
                                />
                            ))
                    ) : (
                        <div className='account__loading'>
                            <FontAwesomeIcon icon={faSpinner} spin size='8x' />
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
    { getUserPosts }
)(Account)
