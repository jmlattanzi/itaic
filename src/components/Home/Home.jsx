import React, { Component } from 'react'

import axios from 'axios'
import Posts from '../Posts/Posts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import './Home.scss'

class Home extends Component {
    constructor() {
        super()

        this.state = {
            posts: [],
        }
    }

    componentDidMount() {
        axios
            .get(`/posts/all`)
            .then((res) =>
                this.setState({
                    posts: res.data,
                })
            )
            .catch((err) => console.log(err))
    }

    render() {
        console.log(this.state.posts)
        return (
            <div className='container'>
                <h2>
                    <em>recent posts</em>
                </h2>
                <div className='grid-container'>
                    {this.state.posts.length > 0 ? (
                        this.state.posts
                            .sort((x, y) => x.id < y.id)
                            .map((post) => (
                                <Posts
                                    key={post.id}
                                    id={post.id}
                                    username={post.username}
                                    image={post.image_url}
                                    caption={post.caption}
                                />
                            ))
                    ) : (
                        <div className='container__loading'>
                            <FontAwesomeIcon icon={faSpinner} spin size='8x' />
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default Home
