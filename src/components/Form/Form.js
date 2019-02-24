import React from 'react'
import Input from '../Input/Input'

const form = (props) => (
    <div>
        <h1 className='modal__header'>Login</h1>
        <form className='modal__login' onSubmit={(e) => this.handleSubmit(e)}>
            <div className='modal__input-field'>
                <FontAwesomeIcon icon={faUser} size='lg' />
                <Input
                    required='required'
                    class='primaryInput'
                    type='text'
                    placeholder='username'
                    name='username'
                    change={this.handleChange}
                />
            </div>
            <div className='modal__input-field'>
                <FontAwesomeIcon icon={faKey} size='lg' />
                <Input
                    required='required'
                    class='primaryInput'
                    type='password'
                    placeholder='password'
                    name='password'
                    change={this.handleChange}
                />
            </div>
            <Input class='submitInput' type='submit' value='login' />
        </form>
    </div>
)

export default form
