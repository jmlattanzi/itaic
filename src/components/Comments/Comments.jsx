import React, { Component } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import Comment from './Comment/Comment'
import Input from '../Input/Input'
import Button from '../Button/Button'
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
            if (this.state.newComment !== '') {
                axios
                    .post('/posts/comments', {
                        post_id: this.props.id,
                        user_id: this.state.currentUser.id,
                        comment: this.state.newComment,
                    })
                    .then((res) => console.log(res.data))
                    .catch((err) => console.log(err))
            } else {
                console.log('Comment cant be empty')
            }
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
                <form
                    class='commentsContainer__form'
                    onSubmit={(e) => this.handleSubmit(e)}>
                    <Input
                        type='text'
                        placeholder='type comment here...'
                        change={this.handleChange}
                        class='primaryInput'
                    />
                    <Input type='submit' value='' class='hidden' />
                    <button
                        class='commentsContainer__send'
                        onClick={(e) => this.handleSubmit(e)}>
                        <FontAwesomeIcon
                            icon={faPaperPlane}
                            size='lg'
                            color='salmon'
                        />
                    </button>
                </form>
            </div>
        )
    }
}

export default Comments
