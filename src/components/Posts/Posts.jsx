import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
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
                    className='posts__modal'>
                    <div className='posts__image'>
                        <Link to={`/post/${this.props.post_id}`}>
                            <img src={this.props.image} alt='' />
                        </Link>
                    </div>
                    <div className='posts__info'>
                        <div className='posts__modal__comments'>
                            <Comments
                                post_id={this.props.post_id}
                                caption={this.props.caption}
                                username={this.props.username}
                                image_url={this.props.image}
                            />
                        </div>
                    </div>
                </Modal>
                {!isMobile ? (
                    <div className='posts__grid-item' onClick={this.openModal}>
                        <img src={this.props.image} alt='' />
                    </div>
                ) : (
                    <div className='posts__grid-item'>
                        <Link to={`/posts/${this.props.post_id}`}>
                            <img src={this.props.image} alt='' />
                        </Link>
                    </div>
                )}
            </div>
        )
    }
}

const mapStateToProps = (state) => state

export default connect(mapStateToProps)(Posts)
