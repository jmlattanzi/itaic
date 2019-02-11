import React, { Component } from 'react'
import axios from 'axios'

class Post extends Component {
    constructor(props) {
        super(props)

        this.state = {
            post: [],
        }
    }

    componentDidMount() {
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
        console.log(this.state.post)
        return (
            <div>
                {this.state.post.length ? (
                    <div>
                        <h1>you are on post {this.state.post[0].id}</h1>
                        <img src={this.state.post[0].image_url} alt='' />
                    </div>
                ) : (
                    <h1>loading</h1>
                )}
            </div>
        )
    }
}

export default Post
