import React, { Component } from 'react'
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
        // get post info
        axios
            .get(`/posts/${this.props.match.params.id}`)
            .then((res) =>
                this.setState({
                    post: res.data,
                })
            )
            .catch((err) => console.log(err))
    }

    render() {
        return (
            <div>
                {this.state.post.length ? (
                    <div>
                        <div className='post'>
                            <div className='post__info'>
                                <img
                                    src={this.state.post[0].image_url}
                                    alt=''
                                />
                            </div>
                            <Comments
                                id={this.state.post[0].id}
                                user_id={this.state.post[0].user_id}
                                caption={this.state.post[0].caption}
                            />
                        </div>
                    </div>
                ) : (
                    <div className='post__container_loading'>
                        <FontAwesomeIcon icon={faSpinner} spin size='8x' />
                    </div>
                )}
            </div>
        )
    }
}

export default Post
