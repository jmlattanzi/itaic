import React from 'react'
import { Link } from 'react-router-dom'
import './Button.scss'

const button = (props) => (
    <button onClick={() => props.click()} className={`button__${props.class}`}>
        {props.link ? (
            <Link to={props.path}>{props.children}</Link>
        ) : (
            <h3>{props.children}</h3>
        )}
    </button>
)

export default button
