import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewPostView extends Component {
    state = {
        post: {
            author: '',
            body: '',
            category: '',
            id: 0,
            timestamp: 0,
            title: '',
            voteScore: 0,
            deleted: false
        }
    }

    addNewPost = () => {
        this.state.post.timestamp = Date.now();
        this.state.id = Math.floor((1 + Math.random()) * 0x100000000000000000000).toString(16).substring(1);
        this.props.addNewPost(this.state.post);
    }

    handlePostTitle = (e) => {
        this.setState({
            post: {
                ...this.state.post,
                title: e.target.value
            }
        })
    }

    handlePostAuthor = (e) => {
        this.setState({
            post: {
                ...this.state.post,
                author: e.target.value
            }
        })
    }

    handlePostCategory = (e) => {
        this.setState({
            post: {
                ...this.state.post,
                category: e.target.value
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
                    <h5>Author:</h5>
                    <input onChange={this.handlePostAuthor} value={this.state.post.author} className="w3-input"/>
                    <h5>Category:</h5>
                    <select onChange={this.handlePostCategory} value={this.state.post.category} className="w3-select">{
                        this.props.categories.map((category, index) => (
                            <option key={category + index}>{category.name}</option>
                        ))
                    }</select>
                    <h5>Content:</h5>
                    <textarea onChange={this.handlePostBody} value={this.state.post.body} className="w3-input" style={{resize: 'none', height: '300px'}}></textarea>
                    <div className="w3-margin-top">
                        <button onClick={this.props.shouldShowNewPostView} className="w3-button w3-orange w3-left w3-text-white" style={{width: '80px', borderRadius: '5px'}}>Cancel</button>
                        <button onClick={this.addNewPost} className="w3-button w3-orange w3-right w3-text-white w3-center" style={{width: '80px', borderRadius: '5px'}}>Add</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ categoriesReducer }) => ({
    categories: categoriesReducer.categories
})

export default connect(mapStateToProps)(NewPostView);
