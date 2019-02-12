import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import { isMobile } from 'react-device-detect'
import Comments from '../Comments/Comments'

import './Posts.scss'

class Posts extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isModalOpen: false,
        }

        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    openModal() {
        this.setState({ modalIsOpen: true })
    }

    closeModal() {
        this.setState({ modalIsOpen: false })
    }

    render() {
        return (
            <div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    className='postModal'>
                    <div className='modalContainer'>
                        <div className='imageContainer'>
                            <Link to={`/post/${this.props.id}`}>
                                <img src={this.props.image} alt='' />
                            </Link>
                        </div>
                        <div className='infoContainer'>
                            <div>
                                <h1>{this.props.caption}</h1>
                            </div>
                            <div className='modalComments'>
                                <Comments id={this.props.id} />
                            </div>
                        </div>
                    </div>
                </Modal>
                {!isMobile ? (
                    <div className='grid-item' onClick={this.openModal}>
                        <img src={this.props.image} alt='' />
                    </div>
                ) : (
                    <div className='grid-item'>
                        <Link to={`/posts/${this.props.id}`}>
                            <img src={this.props.image} alt='' />
                        </Link>
                    </div>
                )}
            </div>
        )
    }
}

export default Posts
