import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getComments, addComment } from '../../redux/commentReducer'
import { getCurrentUser, getUser } from '../../redux/userReducer'
import { editPost, getPost } from '../../redux/postReducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPaperPlane,
    faHeart,
    faSpinner,
    faTimes,
    faEdit,
} from '@fortawesome/free-solid-svg-icons'
import Comment from './Comment/Comment'
import Input from '../Input/Input'
import './Comments.scss'

class Comments extends Component {
    constructor(props) {
        super(props)

        this.state = {
            newComment: '',
            newCaption: '',
            editing: false,
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.submitEdit = this.submitEdit.bind(this)
    }

    componentDidMount() {
        // this.props.getPost(this.props.getPost(this.props.post_id))
        this.props.getComments(this.props.post_id)
        this.props.getUser(this.props.post_id)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.cr.comments.length !== this.props.cr.comments.length) {
            this.props.getComments(this.props.post_id)
        }

        // if (this.props.pr.post.caption !== this.state.newCaption) {
        //     this.props.getPost(this.props.post_id)
        // }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
        console.log(this.state)
    }

    handleEdit() {
        this.setState({
            ...this.state,
            editing: !this.state.editing,
        })
    }

    handleSubmit(e) {
        e.preventDefault()

        if (this.props.ur.user.username === undefined) {
            console.log('You must be logged in to do this')
        } else {
            if (this.state.newComment !== '') {
                this.props.addComment(
                    this.props.post_id,
                    this.props.ur.user.id,
                    this.state.newComment
                )
                this.setState({
                    newComment: '',
                })
            } else {
                console.log('Comment cant be empty')
            }
        }
    }

    submitEdit(e) {
        e.preventDefault()
        this.props.editPost(this.props.post_id, this.state.newCaption)
    }

    render() {
        console.log(this.props.post_id)
        return (
            <div>
                {!this.props.cr.loading ? (
                    <div className='comments'>
                        <div className='comments__header'>
                            <div className='comments__caption'>
                                {this.props.edit ? (
                                    <div className='comments__caption--edit'>
                                        {this.state.editing ? (
                                            <form
                                                onSubmit={(e) =>
                                                    this.submitEdit(e)
                                                }>
                                                <Input
                                                    class='primary'
                                                    placeholder={
                                                        this.props.pr.post
                                                            .caption
                                                    }
                                                    name='newCaption'
                                                    change={this.handleChange}
                                                />
                                                <Input
                                                    type='submit'
                                                    class='submit'
                                                    value='edit'
                                                />
                                            </form>
                                        ) : (
                                            <h3>
                                                {this.props.pr.post.caption}
                                            </h3>
                                        )}
                                        <FontAwesomeIcon
                                            className='comments__edit'
                                            icon={faEdit}
                                            size='lg'
                                            color='#ccc'
                                            onClick={this.handleEdit}
                                        />
                                    </div>
                                ) : (
                                    <h3>{this.props.caption}</h3>
                                )}
                                <Link
                                    to={`/account/${this.props.ur.op.user_id}`}>
                                    <em>@{this.props.ur.op.username}</em>
                                </Link>
                            </div>
                            <div className='comments__interaction'>
                                <FontAwesomeIcon
                                    className='comments__like'
                                    icon={faHeart}
                                    size='lg'
                                    color='#ccc'
                                />
                                <div className='comments__likes'>0</div>
                            </div>
                        </div>
                        <div className='comments__list'>
                            {this.props.cr.comments
                                .sort((x, y) => x.id > y.id)
                                .map((comment) => (
                                    <Comment
                                        key={comment.id}
                                        comment_id={comment.id}
                                        user={comment.username}
                                        current_user_id={this.props.ur.user.id}
                                        op_id={this.props.ur.op.user_id}>
                                        {comment.comment}
                                    </Comment>
                                ))}
                        </div>
                        <form
                            className='comments__form'
                            onSubmit={(e) => this.handleSubmit(e)}>
                            <Input
                                type='text'
                                placeholder='type comment here...'
                                change={this.handleChange}
                                value={this.state.newComment}
                                name='newComment'
                                class='primary'
                            />
                            <Input type='submit' value='' class='hidden' />
                            <button
                                className='comments__send'
                                onClick={(e) => this.handleSubmit(e)}>
                                <FontAwesomeIcon
                                    icon={faPaperPlane}
                                    size='lg'
                                    color='salmon'
                                />
                            </button>
                        </form>
                    </div>
                ) : (
                    <div>
                        <FontAwesomeIcon
                            icon={faSpinner}
                            spin
                            size='4x'
                            color='salmon'
                        />
                    </div>
                )}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps,
    { getComments, getCurrentUser, addComment, getUser, editPost, getPost }
)(Comments)
