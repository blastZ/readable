import React, { Component } from 'react';
import { connect } from 'react-redux';
import { shouldShowNewCommentView, handleNewCommentViewComment } from '../../actions/app_action';

class NewCommentView extends Component {
    addNewComment = () => {
        const comment = this.props.editComment;
        comment.timestamp = Date.now();
        comment.id = Math.floor((1 + Math.random()) * 0x10000000000000).toString(16).substring(1);
        comment.parentId = this.props.post.id;
        this.props.addNewComment(comment);
    }

    handleCommentAuthor = (e) => {
        this.props.handleComment({
            ...this.props.editComment,
            author: e.target.value
        })
    }

    handleCommentBody = (e) => {
        this.props.handleComment({
            ...this.props.editComment,
            body: e.target.value
        })
    }

    render() {
        return (
            <div className="w3-modal" style={{display: 'block', background: 'rgba(0, 0, 0, 0.3)'}}>
                <div className="w3-content w3-black w3-text-white flex-box flex-column w3-container" style={{width: '55%', borderRadius: '10px', padding: '30px 40px 40px 40px'}}>
                    <h5>Author:</h5>
                    <input onChange={this.handleCommentAuthor} value={this.props.editComment.author} className="w3-input"/>
                    <h5>Content:</h5>
                    <textarea onChange={this.handleCommentBody} value={this.props.editComment.body} className="w3-input" style={{resize: 'none', height: '300px'}}></textarea>
                    <div className="w3-margin-top">
                        <button onClick={this.props.shouldShowNewCommentView} className="w3-button w3-orange w3-left w3-text-white" style={{width: '80px', borderRadius: '5px'}}>Cancel</button>
                        <button onClick={this.addNewComment} className="w3-button w3-orange w3-right w3-text-white w3-center" style={{width: '80px', borderRadius: '5px'}}>Add</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ postsReducer, appReducer }) => ({
    post: postsReducer.post,
    editComment: appReducer.controlledComponentState.NewCommentView.comment
})

const mapDispatchToProps = ((dispatch) => ({
    shouldShowNewCommentView: () => dispatch(shouldShowNewCommentView()),
    handleComment: (comment) => dispatch(handleNewCommentViewComment(comment))
}))

export default connect(mapStateToProps, mapDispatchToProps)(NewCommentView);
