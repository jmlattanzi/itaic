import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../../redux/userReducer'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class Logout extends Component {
    componentDidMount() {
        this.props.logout()
    }

    render() {
        return <Redirect path to='/' />
    }
}

const mapStateToProps = (state) => state

export default connect(
    mapStateToProps,
    { logout }
)(Logout)
