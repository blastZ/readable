import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import UserIcon from 'react-icons/lib/fa/user';
import UpIcon from 'react-icons/lib/fa/thumbs-o-up';
import DownIcon from 'react-icons/lib/fa/thumbs-o-down';
import AddCommentIcon from 'react-icons/lib/fa/plus-square';
import CommentSelectIcon from 'react-icons/lib/fa/ellipsis-h';
import { setComment } from '../actions/comments_action';
import { shouldShowNewCommentView, shouldShowEditCommentView, shouldShowCommentSelect } from '../actions/app_action';

class PostPage extends Component {
    shouldShowCommentSelect = (index) => {
        this.props.shouldShowCommentSelect(index);
    }

    shouldShowEditCommentView = (index) => {
        this.shouldShowCommentSelect();
        this.props.setComment(this.props.comments[index]);
        this.props.shouldShowEditCommentView();
    }

    componentDidMount() {
        const id = this.props.location.pathname.split('/')[2];
        this.props.fetchPostDetails(id);
        this.props.fetchComments(id);
    }

    getFormatTime = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();
        return `${year}/${month}/${day} ${hour}:${minute < 10 ? `0${minute}` : minute}:${second}`;
    }

    upCommentVoteScore = (id) => {
        this.props.changeCommentVoteScore(id, 'upVote');
    }

    downCommentVoteScore = (id) => {
        this.props.changeCommentVoteScore(id, 'downVote');
    }

    upPostVoteScore = (id) => {
        this.props.changePostVoteScore(id, 'upVote');
    }

    downPostVoteScore = (id) => {
        this.props.changePostVoteScore(id, 'downVote');
    }

    deleteComment = (index) => {
        this.shouldShowCommentSelect();
        this.props.setComment(this.props.comments[index]);
        this.props.fetchDeleteComment(this.props.comments[index].id);
    }

    componentWillUpdate = (nextProps) => {
        if(!nextProps.post.body) {
            this.props.history.push('/error');
        }
    }

    render() {
        const { post, comments } = this.props;
        return (
            <div className="load-page-right w3-padding-64 w3-container w3-content flex-box flex-column">
                <div>
                    <h2 className="w3-center">{post.title}</h2>
                </div>
                <div>
                    <h5 className="w3-center w3-text-gray">{`${this.getFormatTime(post.timestamp)} by `}<b>{post.author}</b>
                    </h5>
                </div>
                <div className="w3-padding-64" style={{borderBottom: '1px solid #e5e5e5', position: 'relative', flex: '1 600px'}}>
                    <p style={{whiteSpace: 'pre'}}>{post.body}</p>
                    <div className="flex-box" style={{position: 'absolute', right: '5px', bottom: '5px', alignItems: 'center'}}>
                        <UpIcon onClick={this.upPostVoteScore.bind(this, post.id)} className="w3-xlarge hoverable w3-hover-text-black" style={{color: 'rgb(202,198,198)'}}/>
                        <DownIcon onClick={this.downPostVoteScore.bind(this, post.id)} className="w3-xlarge margin-left hoverable w3-hover-text-black" style={{color: 'rgb(202,198,198)'}}/>
                        <p className="margin-left">{post.voteScore}</p>
                    </div>
                </div>
                <div className="flex-box" style={{alignItems: 'center', marginTop: '32px'}}>
                    <AddCommentIcon onClick={this.props.shouldShowNewCommentView} className="hoverable w3-hover-text-black" style={{fontSize: '2em', marginRight: '5px', color: 'rgb(202,198,198)'}}/>
                    <h2>{`${comments.length} Comments :`}</h2>
                </div>
                <div>{
                    comments.map((comment, index) => (
                        <div key={comment.id} className="flex-box flex-column">
                            <div className="flex-box" style={{alignItems: 'center', position: 'relative'}}>
                                {
                                    this.props.showCommentSelect && this.props.currentCommentIndex === index ?
                                    <div className="drop-down w3-black w3-container" style={{position: 'absolute', right: '25px', bottom: '-73px', paddingTop: '10px', paddingBottom: '10px'}}>
                                        <div style={{width: '0px', height: '0px', position: 'absolute', right: '0px', top: '-8px', borderWidth: '0px 0px 8px 8px', borderStyle: 'solid', borderColor: 'transparent transparent black transparent'}}></div>
                                        <div onClick={this.shouldShowEditCommentView.bind(this, index)} className="drop-down-icon">Edit</div>
                                        <div onClick={this.deleteComment.bind(this, index)} className="drop-down-icon">Delete</div>
                                    </div>
                                    : null
                                }
                                <UserIcon className="w3-xlarge" style={{color: 'rgb(202,198,198)'}}/>
                                <h3 className="margin-left">{comment.author}</h3>
                                <p className="margin-left" style={{color: '#00A1E4'}}>{this.getFormatTime(comment.timestamp)}</p>
                                <CommentSelectIcon onClick={this.shouldShowCommentSelect.bind(this, index)}
                                                   className="w3-xlarge hoverable w3-hover-text-black" style={{position: 'absolute', right: '5px', bottom: '5px', color: 'rgb(202, 198, 198)'}}/>
                            </div>
                            <div className="flex-box flex-column w3-container" style={{border: '1px solid #e5e5e5', padding: '27px 20px'}}>
                                <p style={{whiteSpace: 'pre'}}>{comment.body}</p>
                            </div>
                            <div className="flex-box" style={{flexDirection: 'row-reverse', alignItems: 'center'}}>
                                <p className="margin-left">{comment.voteScore}</p>
                                <DownIcon onClick={this.downCommentVoteScore.bind(this, comment.id)} className="w3-xlarge margin-left hoverable w3-hover-text-black" style={{color: 'rgb(202,198,198)'}}/>
                                <UpIcon onClick={this.upCommentVoteScore.bind(this, comment.id)} className="w3-xlarge hoverable w3-hover-text-black" style={{color: 'rgb(202,198,198)'}}/>
                            </div>
                        </div>
                    ))
                }</div>
            </div>
        )
    }
}

const mapStateToProps = ({ postsReducer, commentsReducer, appReducer }) => ({
    post: postsReducer.post,
    comments: commentsReducer.comments,
    comment: commentsReducer.comment,
    showCommentSelect: appReducer.commentOptionState.showCommentSelect,
    currentCommentIndex: appReducer.commentOptionState.currentCommentIndex
})

const mapDispatchToProps = ((dispatch) => ({
    setComment: (comment) => dispatch(setComment(comment)),
    shouldShowNewCommentView: () => dispatch(shouldShowNewCommentView()),
    shouldShowEditCommentView: () => dispatch(shouldShowEditCommentView()),
    shouldShowCommentSelect: (currentCommentIndex) => dispatch(shouldShowCommentSelect(currentCommentIndex))
}))

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostPage));
