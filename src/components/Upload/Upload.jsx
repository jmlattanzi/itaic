import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCurrentUser } from '../../redux/userReducer'
import axios from 'axios'
import DropZone from 'react-file-drop'
import s3Upload from 'react-s3-uploader'
import Input from '../Input/Input'
import './Upload.scss'

class Upload extends Component {
    constructor() {
        super()

        this.state = {
            caption: '',
            file: {},
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleFileChange = this.handleFileChange.bind(this)
        this.upload = this.upload.bind(this)
    }

    handleFileChange(e) {
        console.log(e.target.files[0])
        this.setState({
            file: e.target.files[0],
        })
    }

    handleChange(e) {
        this.setState({
            caption: e.target.value,
        })
    }

    upload(e) {
        e.preventDefault()
        const data = new FormData(e.target)
        data.append('image', this.state.file)
        data.append('caption', this.state.caption)

        axios
            .post('/posts/upload', data)
            .then((res) => console.log('image uploaded', res.data))
            .catch((err) => console.log(err))

        this.props.location.push('/')
    }

    render() {
        return (
            <div className='upload'>
                <h1>upload</h1>
                <form class='upload__form' onSubmit={(e) => this.upload(e)}>
                    <label className='label'>choose file</label>
                    <Input
                        type='file'
                        class='primary'
                        change={this.handleFileChange}
                    />
                    <Input
                        type='text'
                        class='primary'
                        placeholder='caption'
                        change={this.handleChange}
                    />
                    <Input type='submit' value='submit' class='submit' />
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => state

export default connect(
    mapStateToProps,
    { getCurrentUser }
)(Upload)
