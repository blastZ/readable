import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import BackIcon from 'react-icons/lib/fa/arrow-left';
import OptionIcon from 'react-icons/lib/fa/ellipsis-v';
import { shouldShowEditPostView, changePostsOrderMethod, shouldShowPostSelect } from '../actions/app_action';

class TopBar extends Component {
    shouldShowEditPostView = () => {
        this.props.shouldShowPostSelect();
        this.props.shouldShowEditPostView();
    }

    deletePost = () => {
        this.props.shouldShowPostSelect();
        this.props.deletePost(this.props.post.id);
    }

    backToHomePage = () => {
        this.props.history.goBack();
    }

    render() {
        return (
            <div className="load-top-bar w3-orange w3-text-white w3-container w3-padding-16" style={{position: 'relative', zIndex: '2', display: 'flex', alignItems: 'center', fontSize: '1.2em'}}>
                {
                    this.props.showPostSelect ?
                    <div className="drop-down w3-black w3-container" style={{position: 'absolute', right: '25px', bottom: '-73px', paddingTop: '10px', paddingBottom: '10px'}}>
                        <div style={{width: '0px', height: '0px', position: 'absolute', right: '0px', top: '-8px', borderWidth: '0px 0px 8px 8px', borderStyle: 'solid', borderColor: 'transparent transparent black transparent'}}></div>
                        <div onClick={this.shouldShowEditPostView} className="drop-down-icon">Edit</div>
                        <div onClick={this.deletePost} className="drop-down-icon">Delete</div>
                    </div>
                    : null
                }
                <BackIcon onClick={this.backToHomePage} className="w3-xxlarge w3-text-white hoverable w3-hover-text-black"/>
                <OptionIcon onClick={this.props.shouldShowPostSelect} className="w3-xxlarge w3-text-white hoverable w3-hover-text-black" style={{position: 'absolute', right: '5px'}}/>
            </div>
        )
    }
}

const mapStateToProps = ({categoriesReducer, postsReducer, appReducer}) => ({
    categories: categoriesReducer.categories,
    post: postsReducer.post,
    postsOrderMethod: appReducer.postsOrderMethod,
    showPostSelect: appReducer.postOptionState.showPostSelect
})

const mapDispatchToProps = ((dispatch) => ({
    shouldShowEditPostView: () => dispatch(shouldShowEditPostView()),
    shouldShowPostSelect: () => dispatch(shouldShowPostSelect())
}))

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopBar));
