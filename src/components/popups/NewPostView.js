import React, { Component } from 'react';
import { connect } from 'react-redux';
import { shouldShowNewPostView, handleNewPostViewPost } from '../../actions/app_action';

class NewPostView extends Component {
    addNewPost = () => {
        const post = this.props.editPost;
        post.timestamp = Date.now();
        post.id = Math.floor((1 + Math.random()) * 0x10000000000000).toString(16).substring(1);
        if(post.category === '') {
            post.category = this.props.categories[0].name;
        }
        this.props.addNewPost(post);
    }

    handlePostTitle = (e) => {
        this.props.handlePost({
            ...this.props.editPost,
            title: e.target.value
        })
    }

    handlePostAuthor = (e) => {
        this.props.handlePost({
            ...this.props.editPost,
            author: e.target.value
        })
    }

    handlePostCategory = (e) => {
        this.props.handlePost({
            ...this.props.editPost,
            category: e.target.value
        })
    }

    handlePostBody = (e) => {
        this.props.handlePost({
            ...this.props.editPost,
            body: e.target.value
        })
    }

    componentWillUnmount() {
        this.props.handlePost({
            author: '',
            body: '',
            category: '',
            id: 0,
            timestamp: 0,
            title: ''
        })
    }

    render() {
        return (
            <div className="w3-modal" style={{display: 'block', background: 'rgba(0, 0, 0, 0.3)'}}>
                <div className="w3-content w3-black w3-text-white flex-box flex-column w3-container" style={{width: '55%', borderRadius: '10px', padding: '30px 40px 40px 40px'}}>
                    <h5>Title:</h5>
                    <input onChange={this.handlePostTitle} value={this.props.editPost.title} className="w3-input"/>
                    <h5>Author:</h5>
                    <input onChange={this.handlePostAuthor} value={this.props.editPost.author} className="w3-input"/>
                    <h5>Category:</h5>
                    <select onChange={this.handlePostCategory} value={this.props.editPost.category} className="w3-select">{
                        this.props.categories.map((category, index) => (
                            <option key={category + index}>{category.name}</option>
                        ))
                    }</select>
                    <h5>Content:</h5>
                    <textarea onChange={this.handlePostBody} value={this.props.editPost.body} className="w3-input" style={{resize: 'none', height: '300px'}}></textarea>
                    <div className="w3-margin-top">
                        <button onClick={this.props.shouldShowNewPostView} className="w3-button w3-orange w3-left w3-text-white" style={{width: '80px', borderRadius: '5px'}}>Cancel</button>
                        <button onClick={this.addNewPost} className="w3-button w3-orange w3-right w3-text-white w3-center" style={{width: '80px', borderRadius: '5px'}}>Add</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ categoriesReducer, appReducer }) => ({
    categories: categoriesReducer.categories,
    editPost: appReducer.controlledComponentState.NewPostView.post
})

const mapDispatchToProps = (dispatch) => ({
    shouldShowNewPostView: () => dispatch(shouldShowNewPostView()),
    handlePost: (post) => dispatch(handleNewPostViewPost(post))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewPostView);
