import React, { Component } from 'react';
import { connect } from 'react-redux';
import { shouldShowNewCommentView } from '../../actions/app_action';

class NewCommentView extends Component {
    state = {
        comment: {
            author: '',
            body: '',
            id: 0,
            parentId: 0,
            timestamp: 0
        }
    }

    addNewComment = () => {
        const comment = this.state.comment;
        comment.timestamp = Date.now();
        comment.id = Math.floor((1 + Math.random()) * 0x10000000000000).toString(16).substring(1);
        comment.parentId = this.props.post.id;
        this.props.addNewComment(comment);
    }

    handleCommentAuthor = (e) => {
        this.setState({
            comment: {
                ...this.state.comment,
                author: e.target.value
            }
        })
    }

    handleCommentBody = (e) => {
        this.setState({
            comment: {
                ...this.state.comment,
                body: e.target.value
            }
        })
    }

    render() {
        return (
            <div className="w3-modal" style={{display: 'block', background: 'rgba(0, 0, 0, 0.3)'}}>
                <div className="w3-content w3-black w3-text-white flex-box flex-column w3-container" style={{width: '55%', borderRadius: '10px', padding: '30px 40px 40px 40px'}}>
                    <h5>Author:</h5>
                    <input onChange={this.handleCommentAuthor} value={this.state.comment.author} className="w3-input"/>
                    <h5>Content:</h5>
                    <textarea onChange={this.handleCommentBody} value={this.state.comment.body} className="w3-input" style={{resize: 'none', height: '300px'}}></textarea>
                    <div className="w3-margin-top">
                        <button onClick={this.props.shouldShowNewCommentView} className="w3-button w3-orange w3-left w3-text-white" style={{width: '80px', borderRadius: '5px'}}>Cancel</button>
                        <button onClick={this.addNewComment} className="w3-button w3-orange w3-right w3-text-white w3-center" style={{width: '80px', borderRadius: '5px'}}>Add</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ postsReducer }) => ({
    post: postsReducer.post
})

const mapDispatchToProps = ((dispatch) => ({
    shouldShowNewCommentView: () => dispatch(shouldShowNewCommentView())
}))

export default connect(mapStateToProps, mapDispatchToProps)(NewCommentView);
