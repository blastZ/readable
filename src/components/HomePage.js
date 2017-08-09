import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllPosts } from '../actions/posts_action';

class HomePage extends Component {

    componentDidMount() {
        const that = this;
        fetch('http://localhost:5001/posts', {
            headers: {
                'Authorization': 'Basic'
            }
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log(data);
            that.props.getAllPosts(data);
        })
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
            <div>{
                this.props.posts.map((post) => (
                    <div key={post.id + post. title}>
                        <h3>{`${this.getFormatTime(post.timestamp)} ${post.title}`}</h3>
                        <h4>{post.author}</h4>
                    </div>
                ))
            }</div>
        )
    }
}

function mapStateToProps({postsReducer}) {
    return {
        posts: postsReducer.posts
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllPosts: (data) => dispatch(getAllPosts(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
