import React from 'react'
import Button from '../Button/Button'
import './Alert.scss'

const alert = (props) => {
    const needToLogin = 'You must be logged in to do this'
    const emptyComment = 'Comment cannot be emtpy'

    return (
        <div className='alert'>
            <div className='alert__message'>
                {props.message === 'auth' ? <h2>{needToLogin}</h2> : <h2>{emptyComment}</h2>}
            </div>
            <div className='alert__button'>
                <Button class='primary' link path='/login'>
                    login
                </Button>
            </div>
        </div>
    )
}

export default alert
