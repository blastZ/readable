import React, { Component } from 'react';
import { connect } from 'react-redux';
import FireIcon from 'react-icons/lib/fa/star-o';
import { Link } from 'react-router-dom';

class HomePage extends Component {
    componentDidMount() {
        this.props.fetchCategories();
        this.props.fetchPosts('all');
    }

    getFormatTime = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();
        return `${hour}:${minute < 10 ? `0${minute}` : minute}`;
    }

    render() {
        return (
            <div className="load-page-left w3-container" style={{paddingTop: '90px'}}>{
                this.props.postsOrderMethod === 'vote-score' ?
                    this.props.orderPosts(this.props.posts, 'vote-score').map((post, index) => (
                        <div key={post.id + index}>
                            <h3 className="flex-box" style={{alignItems: 'center'}}>
                                {`${this.getFormatTime(post.timestamp)}`}
                                <Link to={`/p/${post.id}`} className="post-link">{post.title}</Link>
                                <FireIcon style={{marginLeft: '8px'}}/>{post.voteScore}
                            </h3>
                            <h4>{post.author}</h4>
                        </div>
                    )):
                    this.props.orderPosts(this.props.posts, 'timestamp').map((post, index) => (
                        <div key={post.id + index}>
                            <h3>
                                {`${this.getFormatTime(post.timestamp)}`}
                                <Link to={`/p/${post.id}`} className="post-link">{post.title}</Link>
                            </h3>
                            <h4>{post.author}</h4>
                        </div>
                    ))
            }</div>
        )
    }
}

const mapStateToProps = ({ postsReducer, appReducer }) => ({
    posts: postsReducer.posts,
    postsOrderMethod: appReducer.postsOrderMethod
})

export default connect(mapStateToProps)(HomePage);
