import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllPosts } from '../../redux/postReducer'
import axios from 'axios'
import Posts from '../Posts/Posts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import './Home.scss'

class Home extends Component {
    constructor() {
        super()
    }

    componentDidMount() {
        this.props.getAllPosts()
    }

    render() {
        return (
            <div className='container'>
                <h2>
                    <em>recent posts</em>
                </h2>
                <div className='grid-container'>
                    {this.props.pr.loading ? (
                        this.props.pr.posts
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

const mapStateToProps = (state) => state

export default connect(
    mapStateToProps,
    { getAllPosts }
)(Home)
