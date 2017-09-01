import React, { Component } from 'react';
import { connect } from 'react-redux';
import { shouldShowEditPostView, handleEditPostViewPost } from '../../actions/app_action';

class EditPostView extends Component {
    componentDidMount() {
        this.props.handlePost({
            body: this.props.post.body,
            title: this.props.post.title
        })
    }

    editPost = () => {
        const post = this.props.editPost;
        this.props.fetchPostChange(this.props.post.id, post);
    }

    handlePostTitle = (e) => {
        this.props.handlePost({
            ...this.props.editPost,
            title: e.target.value
        })
    }

    handlePostBody = (e) => {
        this.props.handlePost({
            ...this.props.editPost,
            body: e.target.value
        })
    }

    render() {
        return (
            <div className="w3-modal" style={{display: 'block', background: 'rgba(0, 0, 0, 0.3)'}}>
                <div className="w3-content w3-black w3-text-white flex-box flex-column w3-container" style={{width: '55%', borderRadius: '10px', padding: '30px 40px 40px 40px'}}>
                    <h5>Title:</h5>
                    <input onChange={this.handlePostTitle} value={this.props.editPost.title} className="w3-input"/>
                    <h5>Content:</h5>
                    <textarea onChange={this.handlePostBody} value={this.props.editPost.body} className="w3-input" style={{resize: 'none', height: '300px'}}></textarea>
                    <div className="w3-margin-top">
                        <button onClick={this.props.shouldShowEditPostView} className="w3-button w3-orange w3-left w3-text-white flex-box center-button" style={{width: '80px', borderRadius: '5px'}}>Cancel</button>
                        <button onClick={this.editPost} className="w3-button w3-orange w3-right w3-text-white flex-box center-button" style={{width: '80px', borderRadius: '5px'}}>Confirm</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ postsReducer, appReducer }) => ({
    post: postsReducer.post,
    editPost: appReducer.controlledComponentState.EditPostView.post
})

const mapDispatchToProps = ((dispatch) => ({
    shouldShowEditPostView: () => dispatch(shouldShowEditPostView()),
    handlePost: (post) => dispatch(handleEditPostViewPost(post))
}))

export default connect(mapStateToProps, mapDispatchToProps)(EditPostView);
