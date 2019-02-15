import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getComments, addComment } from '../../redux/commentReducer'
import { getCurrentUser } from '../../redux/userReducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPaperPlane,
    faHeart,
    faSpinner,
} from '@fortawesome/free-solid-svg-icons'
import Comment from './Comment/Comment'
import Input from '../Input/Input'
import './Comments.scss'

class Comments extends Component {
    constructor(props) {
        super(props)

        this.state = {
            newComment: '',
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        console.log(this.props.post_id)
        this.props.getComments(this.props.post_id)
    }

    // componentDidUpdate(prevProps) {
    //     if (prevProps.cr.comments.length !== this.props.cr.comments.length) {
    //         this.props.getComments(this.props.post_id)
    //     }
    // }

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
                    this.props.post_id,
                    this.props.ur.user.id,
                    this.state.newComment
                )
                this.props.getComments(this.props.post_id)
                this.setState({
                    newComment: '',
                })
            } else {
                console.log('Comment cant be empty')
            }
        }
    }

    render() {
        return (
            <div>
                {!this.props.cr.loading ? (
                    <div className='comments'>
                        <div className='comments__header'>
                            <div className='comments__caption'>
                                <h3>{this.props.caption}</h3>
                                <em>@{this.props.ur.op.username}</em>
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
                                        user={comment.username}>
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
    console.log(state)
    return state
}

export default connect(
    mapStateToProps,
    { getComments, getCurrentUser, addComment }
)(Comments)
