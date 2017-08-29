import React, { Component } from 'react';
import { connect } from 'react-redux';

class EditPostView extends Component {
    state = {
        post: {
            body: '',
            title: ''
        }
    }

    componentDidMount() {
        this.setState({
            post: {
                body: this.props.post.body,
                title: this.props.post.title
            }
        })
    }

    editPost = () => {
        const post = this.state.post;
        this.props.editPost(post);
    }

    handlePostTitle = (e) => {
        this.setState({
            post: {
                ...this.state.post,
                title: e.target.value
            }
        })
    }

    handlePostBody = (e) => {
        this.setState({
            post: {
                ...this.state.post,
                body: e.target.value
            }
        })
    }

    render() {
        return (
            <div className="w3-modal" style={{display: 'block', background: 'rgba(0, 0, 0, 0.3)'}}>
                <div className="w3-content w3-black w3-text-white flex-box flex-column w3-container" style={{width: '55%', borderRadius: '10px', padding: '30px 40px 40px 40px'}}>
                    <h5>Title:</h5>
                    <input onChange={this.handlePostTitle} value={this.state.post.title} className="w3-input"/>
                    <h5>Content:</h5>
                    <textarea onChange={this.handlePostBody} value={this.state.post.body} className="w3-input" style={{resize: 'none', height: '300px'}}></textarea>
                    <div className="w3-margin-top">
                        <button onClick={this.props.shouldShowEditPostView} className="w3-button w3-orange w3-left w3-text-white flex-box center-button" style={{width: '80px', borderRadius: '5px'}}>Cancel</button>
                        <button onClick={this.editPost} className="w3-button w3-orange w3-right w3-text-white flex-box center-button" style={{width: '80px', borderRadius: '5px'}}>Confirm</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ postsReducer }) => ({
    post: postsReducer.post
})

export default connect(mapStateToProps)(EditPostView);
