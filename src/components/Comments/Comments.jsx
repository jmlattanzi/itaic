import React, { Component } from 'react'
import axios from 'axios'
import Comment from './Comment/Comment'
import Input from '../Input/Input'
import './Comments.scss'

class Comments extends Component {
    constructor(props) {
        super(props)

        this.state = {
            comments: [],
            newComment: '',
            loggedIn: false,
            currentUser: {},
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        axios
            .get(`/posts/comments/${this.props.id}`)
            .then((res) =>
                this.setState({
                    comments: res.data,
                })
            )
            .catch((err) => console.log(err))

        axios
            .get('/auth/current')
            .then((res) => {
                if (res.data.username) {
                    this.setState({
                        ...this.state,
                        currentUser: res.data,
                        loggedIn: true,
                    })
                }
            })
            .catch((err) => console.log(err))
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.comments.length !== this.state.comments.length) {
            axios
                .get(`/posts/comments/${this.props.id}`)
                .then((res) =>
                    this.setState({
                        comments: res.data,
                    })
                )
                .catch((err) => console.log(err))
        }
    }

    handleChange(e) {
        this.setState({
            newComment: e.target.value,
        })
    }

    handleSubmit(e) {
        e.preventDefault()

        if (!this.state.loggedIn) {
            console.log('you must be logged in to do this')
        } else {
            axios
                .post('/posts/comments', {
                    post_id: this.props.id,
                    user_id: this.state.currentUser.id,
                    comment: this.state.newComment,
                })
                .then((res) => console.log(res.data))
                .catch((err) => console.log(err))
        }
    }

    render() {
        return (
            <div className='commentsContainer'>
                <div className='commentsContainer__caption'>
                    <h3>{this.props.caption}</h3>
                </div>
                <div className='commentsContainer__list'>
                    {this.state.comments
                        .sort((x, y) => x.id > y.id)
                        .map((comment) => (
                            <Comment key={comment.id}>
                                {comment.comment}
                            </Comment>
                        ))}
                </div>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <Input
                        type='text'
                        placeholder='type comment here...'
                        change={this.handleChange}
                    />
                    <Input type='submit' value='post' />
                </form>
            </div>
        )
    }
}

export default Comments
