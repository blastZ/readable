import React, { Component } from 'react';
import HomePage from './HomePage';
import TopBar from './TopBar';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setPosts, setPost } from '../actions/posts_action';
import { setCategories } from '../actions/categories_action';
import { setComments } from '../actions/comments_action';
import AddPostIcon from 'react-icons/lib/fa/plus-square';
import '../css/index.css';
import NewPostView from './popups/NewPostView';
import NewCommentView from './popups/NewCommentView';
import EditPostView from './popups/EditPostView';
import { Route } from 'react-router-dom';
import PostPage from './PostPage';

class App extends Component {
    state = {
        headers: {
            'Authorization': 'Basic'
        },
        postHeaders: {
            'Authorization': 'Basic',
            'Content-Type': 'application/json'
        },
        defaultURL: 'http://localhost:5001/',
        orderMethod: 'vote-score',
        showNewPostView: false,
        showNewCommentView: false,
        showEditPostView: false
    }

    shouldShowEditPostView = () => {
        this.setState({showEditPostView: !this.state.showEditPostView});
    }

    shouldShowNewPostView = () => {
        this.setState({showNewPostView: !this.state.showNewPostView});
    }

    shouldShowNewCommentView = () => {
        this.setState({showNewCommentView: !this.state.showNewCommentView});
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

    fetchPostDetails = (id) => {
        const { headers, defaultURL } = this.state;
        fetch(`${defaultURL}posts/${id}`, { headers }).then((response) => (
            response.json()
        )).then((data) => {
            this.props.setPost(data);
        })
    }

    fetchComments = (id) => {
        const { headers, defaultURL } = this.state;
        fetch(`${defaultURL}posts/${id}/comments`, { headers }).then((response) => (
            response.json()
        )).then((data) => {
            this.props.setComments(data);
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
        const { postHeaders, defaultURL } = this.state;
        fetch(`${defaultURL}posts`, {
            headers: postHeaders,
            method: 'POST',
            body: JSON.stringify(post)
        }).then((response) => {
            if(response.status === 200) {
                this.fetchPosts('all');
            }
        })
    }

    addNewComment = (comment) => {
        this.shouldShowNewCommentView();
        const { postHeaders, defaultURL } = this.state;
        fetch(`${defaultURL}comments`, {
            headers: postHeaders,
            method: 'POST',
            body: JSON.stringify(comment)
        }).then((response) => {
            if(response.status === 200) {
                this.fetchComments(this.props.post.id);
            }
        })
    }

    changeCommentVoteScore = (id, voteMethod) => {
        const { postHeaders, defaultURL } = this.state;
        fetch(`${defaultURL}comments/${id}`, {
            headers: postHeaders,
            method: 'POST',
            body: JSON.stringify({
                option: voteMethod
            })
        }).then((response) => {
            if(response.status === 200) {
                this.fetchComments(this.props.post.id);
            }
        })
    }

    changePostVoteScore = (id, voteMethod) => {
        const { postHeaders, defaultURL } = this.state;
        fetch(`${defaultURL}posts/${id}`, {
            headers: postHeaders,
            method: 'POST',
            body: JSON.stringify({
                option: voteMethod
            })
        }).then((response) => {
            if(response.status === 200) {
                this.fetchPostDetails(id);
            }
        })
    }

    render() {
        return (
            <div className="full-height">
                <Route exact path="/" render={() => (
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
                )}/>
                <Route exact path="/p/:postID" render={() => (
                    <div className="full-height">
                        <TopBar shouldShowEditPostView={this.shouldShowEditPostView}/>
                        <PostPage fetchPostDetails={this.fetchPostDetails}
                                  fetchComments={this.fetchComments}
                                  shouldShowNewCommentView={this.shouldShowNewCommentView}
                                  changeCommentVoteScore={this.changeCommentVoteScore}
                                  changePostVoteScore={this.changePostVoteScore}/>
                        {
                            this.state.showNewCommentView ?
                            <NewCommentView shouldShowNewCommentView={this.shouldShowNewCommentView}
                                            addNewComment={this.addNewComment}/>
                            : null
                        }
                        {
                            this.state.showEditPostView ?
                            <EditPostView shouldShowEditPostView={this.shouldShowEditPostView}/>
                            : null
                        }
                    </div>
                )}/>
            </div>
        )
    }
}

const mapStateToProps = ({ postsReducer }) => ({
    posts: postsReducer.posts,
    post: postsReducer.post
})

const mapDispatchToProps = (dispatch) => ({
    setPosts: (posts) => dispatch(setPosts(posts)),
    setPost: (post) => dispatch(setPost(post)),
    setCategories: (categories) => dispatch(setCategories(categories)),
    setComments: (comments) => dispatch(setComments(comments))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
