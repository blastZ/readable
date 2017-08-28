import React, { Component } from 'react';
import { connect } from 'react-redux';

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
        return `${hour}:${minute < 10 ? `0${minute}` : minute}:${second}`;
    }

    render() {
        return (
            <div className="w3-padding-16 w3-container">{
                this.props.orderMethod === 'vote-score' ?
                    this.props.orderPosts(this.props.posts, 'vote-score').map((post, index) => (
                        <div key={post.id + index}>
                            <h3>{`${this.getFormatTime(post.timestamp)} ${post.title}`}</h3>
                            <h4>{post.author}</h4>
                        </div>
                    )):
                    this.props.orderPosts(this.props.posts, 'timestamp').map((post, index) => (
                        <div key={post.id + index}>
                            <h3>{`${this.getFormatTime(post.timestamp)} ${post.title}`}</h3>
                            <h4>{post.author}</h4>
                        </div>
                    ))
            }</div>
        )
    }
}

const mapStateToProps = ({ postsReducer }) => ({
    posts: postsReducer.posts
})

export default connect(mapStateToProps)(HomePage);
