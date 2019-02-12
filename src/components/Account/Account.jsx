import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import Button from '../Button/Button'
import Posts from '../Posts/Posts'
import axios from 'axios'

class Account extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: [],
        }
    }

    componentDidMount() {
        axios
            .get(`http://localhost:3001/users/${this.props.match.params.id}`) // why tf doesnt this work with shorthand
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
            <div>
                <h1>account {this.props.match.params.id}</h1>
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
        )
    }
}

export default Account
