import React, { Component } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
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
            numberOfPosts: 4,
        }

        // this.loadMore = this.loadMore.bind(this)
    }

    componentDidMount() {
        axios
            .get(`/posts/all?n=${this.state.numberOfPosts}`)
            .then((res) =>
                this.setState({
                    posts: res.data,
                    numberOfPosts: (this.state.numberOfPosts += 4),
                })
            )
            .catch((err) => console.log(err))
    }

    // loadMore() {
    //     axios
    //         .get(`/posts/all?n=${this.state.numberOfPosts}`)
    //         .then((res) =>
    //             this.setState({
    //                 posts: res.data,
    //                 numberOfPosts: (this.state.numberOfPosts += 4),
    //             })
    //         )
    //         .catch((err) => console.log(err))
    // }

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
                            .reverse()
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
