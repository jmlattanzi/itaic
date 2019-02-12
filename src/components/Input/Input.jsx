import React from 'react'
import './Input.scss'

const input = (props) => (
    <input
        required={props.required}
        className={`input__${props.class}`}
        type={props.type}
        value={props.value}
        placeholder={props.placeholder}
        name={props.name}
        onChange={(e) => props.change(e)}
    />
)

export default input
