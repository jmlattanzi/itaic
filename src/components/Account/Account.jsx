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
        this.props.getUserPosts(this.props.match.params.id)
    }

    render() {
        console.log(this.props)
        return (
            <div className='account'>
                <div>
                    <h1>account bio and stats</h1>
                </div>
                <h3>{this.props.ur.op.username}</h3>
                <div className='account__grid'>
                    {/* this could really just be a filter, I bet it would be faster */}
                    {this.props.pr.userPosts.length !== 0 ? (
                        this.props.pr.loading ? (
                            this.props.pr.userPosts
                                .sort((x, y) => x.id < y.id)
                                .map((post) => (
                                    <Posts
                                        key={post.id}
                                        post_id={post.id}
                                        username={post.username}
                                        user_id={post.user_id}
                                        image={post.image_url}
                                        caption={post.caption}
                                    />
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
    { getUserPosts }
)(Account)
