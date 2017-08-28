import React, { Component } from 'react';
import HomePage from './HomePage';
import TopBar from './TopBar';
import { connect } from 'react-redux';
import { setPosts } from '../actions/posts_action';
import { setCategories } from '../actions/categories_action';
import AddPostIcon from 'react-icons/lib/fa/plus-square';
import '../css/index.css';
import NewPostView from './popups/NewPostView';

class App extends Component {
    state = {
        headers: {
            'Authorization': 'Basic'
        },
        defaultURL: 'http://localhost:5001/',
        orderMethod: 'vote-score',
        showNewPostView: false
    }

    shouldShowNewPostView = () => {
        this.setState({showNewPostView: !this.state.showNewPostView});
    }

    fetchPosts = (category) => {
        const { headers, defaultURL } = this.state;
        const { setPosts } = this.props;
        if(category === 'all') {
            fetch(`${defaultURL}posts`, { headers }).then((response) => (
                response.json()
            )).then((data) => {
                setPosts(this.orderPosts(data, this.state.orderMethod));
            })
        } else {
            fetch(`${defaultURL}${category}/posts`, { headers }).then((response) => (
                response.json()
            )).then((data) => {
                setPosts(this.orderPosts(data, this.state.orderMethod));
            })
        }
    }

    fetchCategories = () => {
        const { headers, defaultURL } = this.state;
        const { setCategories } = this.props;
        fetch(`${defaultURL}categories`, { headers }).then((response) => (
            response.json()
        )).then((data) => {
            setCategories(data);
        })
    }

    orderPosts = (posts, orderMethod) => {
        if(orderMethod === 'vote-score') {
            for(let i=0; i<posts.length; i++) {
                for(let j=i; j<posts.length; j++) {
                    if(posts[i].voteScore < posts[j].voteScore) {
                        let temp = posts[i];
                        posts[i] = posts[j];
                        posts[j] = temp;
                    }
                }
            }
            return posts;
        } else if(orderMethod === 'timestamp') {
            for(let i=0; i<posts.length; i++) {
                for(let j=i; j<posts.length; j++) {
                    if(posts[i].timestamp < posts[j].timestamp) {
                        let temp = posts[i];
                        posts[i] = posts[j];
                        posts[j] = temp;
                    }
                }
            }
            return posts;
        }
    }

    handleOrderMethodChange = (e) => {
        this.setState({orderMethod: e.target.value});
    }

    addNewPost = (post) => {
        this.shouldShowNewPostView();
        const { headers, defaultURL } = this.state;
        fetch(`${defaultURL}posts`, {
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(post)
        }).then((response) => (
            console.log(response.status)
        ))
    }

    render() {
        return (
            <div className="full-height">
                <TopBar fetchCategories={this.fetchCategories}
                        fetchPosts={this.fetchPosts}
                        orderMethod={this.state.orderMethod}
                        handleOrderMethodChange={this.handleOrderMethodChange}/>
                <HomePage fetchCategories={this.fetchCategories}
                          fetchPosts={this.fetchPosts}
                          orderPosts={this.orderPosts}
                          orderMethod={this.state.orderMethod}/>
                <AddPostIcon onClick={this.shouldShowNewPostView} className="addPostButton"/>
                {
                    this.state.showNewPostView ?
                    <NewPostView shouldShowNewPostView={this.shouldShowNewPostView}
                                 addNewPost={this.addNewPost}/>
                    : null
                }
            </div>
        )
    }
}

const mapStateToProps = ({ postsReducer }) => ({
    posts: postsReducer.posts
})

const mapDispatchToProps = (dispatch) => ({
    setPosts: (posts) => dispatch(setPosts(posts)),
    setCategories: (categories) => dispatch(setCategories(categories))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
