import React from 'react'
import { Link } from 'react-router-dom'
import './Button.scss'

const button = (props) => (
    <div>
        {!props.link ? (
            <button
                onClick={() => props.click()}
                className={`button__${props.class}`}>
                <p>{props.children}</p>
            </button>
        ) : (
            <Link className={`link__${props.class}`} to={props.path}>
                {props.children}
            </Link>
        )}
    </div>
)

export default button
