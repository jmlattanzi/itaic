import { connect } from 'react-redux'
import { getCurrentUser } from '../../redux/userReducer'
import axios from 'axios'
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

    componentDidMount() {
        this.props.getCurrentUser()
    }

    handleFileChange(e) {
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
        data.append('user_id', this.props.ur.user.id)

        if (this.props.ur.user.username !== undefined) {
            axios
                .post(`${process.env.BASE_URL}/posts/upload`, data)
                .then((res) => window.alert('Image uploaded!'))
                .catch((err) => console.log(err))

            this.props.location.pathname = '/'
        } else {
            console.log('You must be logged in to do this')
        }
    }

    render() {
        console.log(this.props.ur.user.id)
        return (
            <div className='upload'>
                <h1>upload</h1>
                <form className='upload__form' onSubmit={(e) => this.upload(e)}>
                    <label className='label'>choose file</label>
                    <Input type='file' class='primary' change={this.handleFileChange} />
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
