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
import EditCommentView from './popups/EditCommentView';
import { Route } from 'react-router-dom';
import PostPage from './PostPage';
import { shouldShowNewPostView, shouldShowNewCommentView, shouldShowEditPostView, shouldShowEditCommentView } from '../actions/app_action';

class App extends Component {
    fetchPosts = (category) => {
        const { headers, defaultURL } = this.props;
        const { setPosts } = this.props;
        if(category === 'all') {
            fetch(`${defaultURL}posts`, { headers }).then((response) => (
                response.json()
            )).then((data) => {
                setPosts(this.orderPosts(data, this.props.postsOrderMethod));
            })
        } else {
            fetch(`${defaultURL}${category}/posts`, { headers }).then((response) => (
                response.json()
            )).then((data) => {
                setPosts(this.orderPosts(data, this.props.postsOrderMethod));
            })
        }
    }

    fetchCategories = () => {
        const { headers, defaultURL } = this.props;
        const { setCategories } = this.props;
        fetch(`${defaultURL}categories`, { headers }).then((response) => (
            response.json()
        )).then((data) => {
            setCategories(data);
        })
    }

    fetchPostDetails = (id) => {
        const { headers, defaultURL } = this.props;
        fetch(`${defaultURL}posts/${id}`, { headers }).then((response) => (
            response.json()
        )).then((data) => {
            this.props.setPost(data);
        })
    }

    fetchComments = (id) => {
        const { headers, defaultURL } = this.props;
        fetch(`${defaultURL}posts/${id}/comments`, { headers }).then((response) => (
            response.json()
        )).then((data) => {
            this.props.setComments(data);
        })
    }

    fetchPostChange = (id, post) => {
        this.props.shouldShowEditPostView();
        const { postHeaders, defaultURL } = this.props;
        fetch(`${defaultURL}posts/${id}`, {
            headers: postHeaders,
            method: 'PUT',
            body: JSON.stringify(post)
        }).then((response) => {
            this.fetchPostDetails(id);
        })
    }

    fetchCommentChange = (id, comment) => {
        this.props.shouldShowEditCommentView();
        const {postHeaders, defaultURL } = this.props;
        fetch(`${defaultURL}comments/${id}`, {
            headers: postHeaders,
            method: 'PUT',
            body: JSON.stringify(comment)
        }).then((response) => {
            this.fetchComments(this.props.post.id);
        })
    }

    fetchDeletePost = (id) => {
        const { headers, defaultURL } = this.props;
        fetch(`${defaultURL}posts/${id}`, {
            headers,
            method: 'DELETE'
        }).then((response) => {
            this.props.history.push('/');
        })
    }

    fetchDeleteComment = (id) => {
        const { headers, defaultURL } = this.props;
        fetch(`${defaultURL}comments/${id}`, {
            headers,
            method: 'DELETE'
        }).then((response) => {
            if(response.status === 200)
                this.fetchComments(this.props.post.id);
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

    addNewPost = (post) => {
        this.props.shouldShowNewPostView();
        const { postHeaders, defaultURL } = this.props;
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
        this.props.shouldShowNewCommentView();
        const { postHeaders, defaultURL } = this.props;
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
        const { postHeaders, defaultURL } = this.props;
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
        const { postHeaders, defaultURL } = this.props;
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
                                fetchPosts={this.fetchPosts}/>
                        <HomePage fetchCategories={this.fetchCategories}
                                  fetchPosts={this.fetchPosts}
                                  orderPosts={this.orderPosts}/>
                        <AddPostIcon onClick={this.props.shouldShowNewPostView} className="addPostButton"/>
                        {
                            this.props.popupsState.showNewPostView ?
                            <NewPostView addNewPost={this.addNewPost}/>
                            : null
                        }
                    </div>
                )}/>
                <Route exact path="/p/:postID" render={() => (
                    <div className="full-height">
                        <TopBar deletePost={this.fetchDeletePost}/>
                        <PostPage fetchPostDetails={this.fetchPostDetails}
                                  fetchComments={this.fetchComments}
                                  fetchDeleteComment={this.fetchDeleteComment}
                                  changeCommentVoteScore={this.changeCommentVoteScore}
                                  changePostVoteScore={this.changePostVoteScore}/>
                        {
                            this.props.popupsState.showNewCommentView ?
                            <NewCommentView addNewComment={this.addNewComment}/>
                            : null
                        }
                        {
                            this.props.popupsState.showEditPostView ?
                            <EditPostView fetchPostChange={this.fetchPostChange}/>
                            : null
                        }
                        {
                            this.props.popupsState.showEditCommentView ?
                            <EditCommentView fetchCommentChange={this.fetchCommentChange}/>
                            : null
                        }
                    </div>
                )}/>
            </div>
        )
    }
}

const mapStateToProps = ({ appReducer, postsReducer, commentsReducer }) => ({
    defaultURL: appReducer.fetchOptions.defaultURL,
    headers: appReducer.fetchOptions.headers,
    postHeaders: appReducer.fetchOptions.postHeaders,
    posts: postsReducer.posts,
    post: postsReducer.post,
    comments: commentsReducer.comments,
    comment: commentsReducer.comment,
    popupsState: appReducer.popupsState,
    postsOrderMethod: appReducer.postsOrderMethod
})

const mapDispatchToProps = (dispatch) => ({
    setPosts: (posts) => dispatch(setPosts(posts)),
    setPost: (post) => dispatch(setPost(post)),
    setCategories: (categories) => dispatch(setCategories(categories)),
    setComments: (comments) => dispatch(setComments(comments)),
    shouldShowNewPostView: () => dispatch(shouldShowNewPostView()),
    shouldShowNewCommentView: () => dispatch(shouldShowNewCommentView()),
    shouldShowEditPostView: () => dispatch(shouldShowEditPostView()),
    shouldShowEditCommentView: () => dispatch(shouldShowEditCommentView())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
