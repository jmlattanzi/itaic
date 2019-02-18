import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteComment } from '../../../redux/commentReducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import './Comment.scss'

class Comment extends Component {
    constructor(props) {
        super(props)

        this.handleDelete = this.handleDelete.bind(this)
    }

    handleDelete() {
        this.props.deleteComment(this.props.comment_id)
    }

    render() {
        return (
            <div className='comment'>
                <div className='comment__container'>
                    <div className='comment__badge'>
                        <FontAwesomeIcon
                            className='comment__like'
                            icon={faHeart}
                            color='#ccc'
                            size='sm'
                        />
                    </div>
                    {this.props.children.charAt(0) === '>' ? (
                        <div className='comment__content--green'>
                            {this.props.children}
                        </div>
                    ) : (
                        <div className='comment__content'>
                            {this.props.children}
                        </div>
                    )}
                    <div className='comment__user'>
                        <em className='comment__username'>{this.props.user}</em>
                    </div>
                </div>
                <div>
                    {/* {this.props.current_user_id === this.props.ur.op.user_id ? (
                        <FontAwesomeIcon
                            className='comment__like'
                            icon={faTimes}
                            size='1x'
                            color='#ccc'
                            onClick={() => this.handleDelete()}
                        />
                    ) : null} */}
                </div>
            </div>
        )
    }
}

export default connect(
    null,
    { deleteComment }
)(Comment)
