import React, { Component } from 'react';
import HomePage from './HomePage';
import TopBar from './TopBar';
import NavigationBar from './NavigationBar';
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
import { Route, Switch } from 'react-router-dom';
import PostPage from './PostPage';
import ErrorPage from './404_page/ErrorPage';
import { shouldShowNewPostView, shouldShowNewCommentView, shouldShowEditPostView, shouldShowEditCommentView } from '../actions/app_action';

class App extends Component {
    componentDidMount() {
        this.fetchCategories();
    }

    fetchPosts = (category) => {
        const { headers, defaultURL } = this.props;
        const { setPosts } = this.props;
        if(category === 'all') {
            fetch(`${defaultURL}posts`, { headers }).then((response) => (
                response.json()
            )).then((data) => {
                setPosts(data);
            })
        } else {
            fetch(`${defaultURL}${category}/posts`, { headers }).then((response) => (
                response.json()
            )).then((data) => {
                setPosts(data);
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
            this.fetchPostDetails(this.props.post.id);
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
                this.fetchPosts(this.getFormatCategory(this.props.location.pathname));
            }
        })
    }

    getFormatCategory = (str) => {
        const category = str.split('/')[1];
        if(category) {
            return category;
        } else {
            return 'all';
        }
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
                this.fetchPosts(this.getFormatCategory(this.props.location.pathname));
                this.fetchPostDetails(id);
            }
        })
    }

    getCategoryPage = (theCategory) => {
        let flag = false;
        this.props.categories.map((category) => {
            if(category.name === theCategory) {
                flag = true;
            }
        })
        if(flag) {
            return (
                <div className="full-height">
                    <NavigationBar fetchCategories={this.fetchCategories}
                            fetchPosts={this.fetchPosts}/>
                    <HomePage fetchCategories={this.fetchCategories}
                              fetchPosts={this.fetchPosts}
                              orderPosts={this.orderPosts}
                              getFormatCategory={this.getFormatCategory}
                              changeCommentVoteScore={this.changeCommentVoteScore}
                              changePostVoteScore={this.changePostVoteScore}/>
                    <AddPostIcon onClick={this.props.shouldShowNewPostView} className="addPostButton"/>
                    {
                        this.props.popupsState.showNewPostView ?
                        <NewPostView addNewPost={this.addNewPost}/>
                        : null
                    }
                </div>
            )
        } else {
            return (
                <ErrorPage/>
            )
        }
    }

    render() {
        return (
            <div className="full-height">
                <Switch>
                    <Route exact path="/" render={() => (
                        <div className="full-height">
                            <NavigationBar fetchCategories={this.fetchCategories}
                                    fetchPosts={this.fetchPosts}/>
                            <HomePage fetchCategories={this.fetchCategories}
                                      fetchPosts={this.fetchPosts}
                                      orderPosts={this.orderPosts}
                                      getFormatCategory={this.getFormatCategory}
                                      changeCommentVoteScore={this.changeCommentVoteScore}
                                      changePostVoteScore={this.changePostVoteScore}/>
                            <AddPostIcon onClick={this.props.shouldShowNewPostView} className="addPostButton"/>
                            {
                                this.props.popupsState.showNewPostView ?
                                <NewPostView addNewPost={this.addNewPost}/>
                                : null
                            }
                        </div>
                    )}/>
                    <Route exact path="/:category" render={() => (
                        <div className="full-height">{
                            this.getCategoryPage(this.getFormatCategory(this.props.location.pathname))
                        }</div>
                    )}/>
                    <Route exact path="/:category/:postID" render={() => (
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
                    <Route path="*" render={() => (
                        <ErrorPage/>
                    )}/>
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = ({ appReducer, postsReducer, commentsReducer, categoriesReducer }) => ({
    defaultURL: appReducer.fetchOptions.defaultURL,
    headers: appReducer.fetchOptions.headers,
    postHeaders: appReducer.fetchOptions.postHeaders,
    posts: postsReducer.posts,
    post: postsReducer.post,
    comments: commentsReducer.comments,
    comment: commentsReducer.comment,
    popupsState: appReducer.popupsState,
    postsOrderMethod: appReducer.postsOrderMethod,
    categories: categoriesReducer.categories
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
