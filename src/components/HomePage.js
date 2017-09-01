import React, { Component } from 'react';
import { connect } from 'react-redux';
import FireIcon from 'react-icons/lib/fa/star-o';
import { withRouter, Link } from 'react-router-dom';
import UpIcon from 'react-icons/lib/fa/thumbs-o-up';
import DownIcon from 'react-icons/lib/fa/thumbs-o-down';

class HomePage extends Component {
    componentDidMount() {
        this.props.fetchCategories();
        this.props.fetchPosts(this.props.getFormatCategory(this.props.location.pathname));
    }

    componentDidUpdate(preProps) {
        if(this.props.location.pathname !== preProps.location.pathname) {
            this.props.fetchPosts(this.props.getFormatCategory(this.props.location.pathname));
        }
    }

    getFormatTime = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();
        return `${year}/${month}/${day} ${hour}:${minute < 10 ? `0${minute}` : minute}`;
    }

    upPostVoteScore = (id) => {
        this.props.changePostVoteScore(id, 'upVote');
    }

    downPostVoteScore = (id) => {
        this.props.changePostVoteScore(id, 'downVote');
    }

    render() {
        return (
            <div className="load-page-left w3-container" style={{paddingTop: '80px'}}>{
                this.props.posts.map((post, index) => (
                    <div key={post.id + index} className="flex-box flex-column w3-padding-16">
                        <p style={{margin: '0', color: 'rgb(0, 161, 228)'}}>{`${this.getFormatTime(post.timestamp)}`}</p>
                        <h3 style={{margin: '0'}}>
                            <Link to={`/${post.category}/${post.id}`} className="post-link">{post.title}</Link>
                        </h3>
                        <p style={{margin: '0', color: '#e3e3e3'}}>{
                            ` by ${post.author} vote-score:${post.voteScore}`
                        }
                        <UpIcon onClick={this.upPostVoteScore.bind(this, post.id)} className="w3-large margin-left hoverable w3-hover-text-black" style={{color: 'rgb(202,198,198)'}}/>
                        <DownIcon onClick={this.downPostVoteScore.bind(this, post.id)} className="w3-large margin-left hoverable w3-hover-text-black" style={{color: 'rgb(202,198,198)'}}/>
                        </p>
                    </div>
                ))
            }</div>
        )
    }
}

const mapStateToProps = ({ postsReducer, appReducer }, ownProps) => ({
    posts: appReducer.postsOrderMethod === 'vote-score' ? ownProps.orderPosts(postsReducer.posts, 'vote-score') : ownProps.orderPosts(postsReducer.posts, 'timestamp'),
    postsOrderMethod: appReducer.postsOrderMethod
})

export default withRouter(connect(mapStateToProps)(HomePage));
