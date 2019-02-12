import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getComments, addComment } from '../../redux/postReducer'
import { getCurrentUser } from '../../redux/userReducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
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
            currentUser: {},
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.props.getComments(this.props.id)
        this.props.getCurrentUser()
        console.log(this.props)
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

        if (!this.props.ur.loggedIn) {
            console.log('You must be logged in to do this')
        } else {
            if (this.state.newComment !== '') {
                this.props.addComment(
                    this.props.id,
                    this.props.ur.user.id,
                    this.state.newComment
                )
                // axios
                //     .post('/posts/comments', {
                //         post_id: this.props.id,
                //         user_id: this.state.currentUser.id,
                //         comment: this.state.newComment,
                //     })
                //     .then((res) => console.log(res.data))
                //     .catch((err) => console.log(err))
            } else {
                console.log('Comment cant be empty')
            }
        }
    }

    render() {
        return (
            <div className='comments'>
                <div className='comments__caption'>
                    <h3>{this.props.caption}</h3>
                </div>
                <div className='comments__list'>
                    {this.props.pr.comments
                        .sort((x, y) => x.id > y.id)
                        .map((comment) => (
                            <Comment key={comment.id}>
                                {comment.comment}
                            </Comment>
                        ))}
                </div>
                <form
                    class='comments__form'
                    onSubmit={(e) => this.handleSubmit(e)}>
                    <Input
                        type='text'
                        placeholder='type comment here...'
                        change={this.handleChange}
                        class='primary'
                    />
                    <Input type='submit' value='' class='hidden' />
                    <button
                        class='comments__send'
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

const mapStateToProps = (state) => state

export default connect(
    mapStateToProps,
    { getComments, getCurrentUser, addComment }
)(Comments)
