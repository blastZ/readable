import React, { Component } from 'react';
import { connect } from 'react-redux';
import { shouldShowEditCommentView } from '../../actions/app_action';

class EditCommentView extends Component {
    state = {
        comment: {
            body: '',
            timestamp: 0
        }
    }

    componentDidMount() {
        this.setState({
            comment: {
                body: this.props.comment.body
            }
        })
    }

    editComment = () => {
        const comment = this.state.comment;
        comment.timestamp = Date.now();
        this.props.fetchCommentChange(this.props.comment.id, comment);
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
                    <h5>Content:</h5>
                    <textarea onChange={this.handleCommentBody} value={this.state.comment.body} className="w3-input" style={{resize: 'none', height: '300px'}}></textarea>
                    <div className="w3-margin-top">
                        <button onClick={this.props.shouldShowEditCommentView} className="w3-button w3-orange w3-left w3-text-white flex-box center-button" style={{width: '80px', borderRadius: '5px'}}>Cancel</button>
                        <button onClick={this.editComment} className="w3-button w3-orange w3-right w3-text-white flex-box center-button" style={{width: '80px', borderRadius: '5px'}}>Confirm</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ postsReducer, commentsReducer }) => ({
    post: postsReducer.post,
    comment: commentsReducer.comment
})

const mapDispatchToProps = ((dispatch) => ({
    shouldShowEditCommentView: () => dispatch(shouldShowEditCommentView())
}))

export default connect(mapStateToProps, mapDispatchToProps)(EditCommentView);
