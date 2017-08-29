import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import UserIcon from 'react-icons/lib/fa/user';
import UpIcon from 'react-icons/lib/fa/thumbs-o-up';
import DownIcon from 'react-icons/lib/fa/thumbs-o-down';
import AddCommentIcon from 'react-icons/lib/fa/plus-square';

class PostPage extends Component {
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

    render() {
        const { post, comments } = this.props;
        return (
            <div className="w3-padding-64 w3-container w3-content flex-box flex-column">
                <div>
                    <h2 className="w3-center">{post.title}</h2>
                </div>
                <div>
                    <h5 className="w3-center w3-text-gray">{`${this.getFormatTime(post.timestamp)} by `}<b>{post.author}</b>
                    </h5>
                </div>
                <div className="w3-padding-64" style={{borderBottom: '1px solid #e5e5e5', position: 'relative'}}>
                    <p>{post.body}</p>
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
                    comments.map((comment) => (
                        <div key={comment.id} className="flex-box flex-column">
                            <div className="flex-box" style={{alignItems: 'center'}}>
                                <UserIcon className="w3-xlarge" style={{color: 'rgb(202,198,198)'}}/>
                                <h3 className="margin-left">{comment.author}</h3>
                                <p className="margin-left" style={{color: '#00A1E4'}}>{this.getFormatTime(comment.timestamp)}</p>
                            </div>
                            <div className="flex-box flex-column w3-container" style={{border: '1px solid #e5e5e5', padding: '27px 20px'}}>
                                <p>{comment.body}</p>
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

const mapStateToProps = ({ postsReducer, commentsReducer }) => ({
    post: postsReducer.post,
    comments: commentsReducer.comments
})

export default withRouter(connect(mapStateToProps)(PostPage));
