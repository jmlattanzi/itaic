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
        if (prevProps.pr.comments.length !== this.props.pr.comments.length) {
            this.props.getComments(this.props.id)
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
                this.props.getComments(this.props.id)
                this.setState({
                    newComment: '',
                })
            } else {
                console.log('Comment cant be empty')
            }
        }
    }

    render() {
        console.log('props.ur.user.id', this.props.ur.user.id)
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
                        value={this.state.newComment}
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
