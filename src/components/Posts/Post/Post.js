import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllPosts, getPost, deletePost, getLikes } from '../../../redux/postReducer'
import { getUser } from '../../../redux/userReducer'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import Comments from '../../Comments/Comments'
import './Post.scss'

class Post extends Component {
    constructor(props) {
        super(props)

        this.state = {
            post: [],
            comments: [],
        }
    }

    componentDidMount() {
        this.props.getPost(this.props.match.params.id)
        this.props.getLikes(this.props.match.params.id)
    }

    render() {
        return (
            <div>
                {this.props.pr.post !== undefined || this.props.pr.post !== {} ? (
                    <div>
                        <div className='post'>
                            <div className='post__info'>
                                <img src={this.props.pr.post.image_url} alt='' />
                            </div>
                            <Comments
                                post_id={this.props.match.params.id}
                                user_id={this.props.pr.post.user_id}
                                caption={this.props.pr.post.caption}
                                edit={
                                    this.props.ur.user.id == this.props.ur.op.user_id ? true : false
                                }
                            />
                        </div>
                    </div>
                ) : (
                    <div className='post__container_loading'>
                        <FontAwesomeIcon icon={faSpinner} spin size='8x' color='salmon' />
                    </div>
                )}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return state
}

export default connect(
    mapStateToProps,
    { getAllPosts, getPost, deletePost, getUser, getLikes }
)(Post)
