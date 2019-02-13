import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import './Comment.scss'

const comment = (props) => (
    <div className='comment'>
        <div className='comment__container'>
            {props.children.charAt(0) === '>' ? (
                <div className='comment__content--green'>{props.children}</div>
            ) : (
                <div className='comment__content'>{props.children}</div>
            )}
            <div className='comment__user'>
                <em className='comment__username'>{props.user}</em>
            </div>
        </div>
        <div>
            <FontAwesomeIcon
                className='comment__like'
                icon={faHeart}
                color='#ccc'
                size='sm'
            />
        </div>
    </div>
)

export default comment
