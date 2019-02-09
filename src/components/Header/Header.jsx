import React from 'react'
import { Link } from 'react-router-dom'
import './Header.scss'

const header = (props) => (
    <div className='header'>
        <h1>Header</h1>
        <div className='header__links'>
            <Link className='header__link' to='/login'>
                Login
            </Link>
            <Link className='header__link' to='/register'>
                Register
            </Link>
        </div>
    </div>
)

export default header
