import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import BackIcon from 'react-icons/lib/fa/arrow-left';
import OptionIcon from 'react-icons/lib/fa/ellipsis-v';
import { shouldShowEditPostView, changePostsOrderMethod } from '../actions/app_action';

class TopBar extends Component {
    state = {
        showSelect: false
    }

    shouldShowSelect = () => {
        this.setState({showSelect: !this.state.showSelect});
    }

    shouldShowEditPostView = () => {
        this.shouldShowSelect();
        this.props.shouldShowEditPostView();
    }

    deletePost = () => {
        this.shouldShowSelect();
        this.props.deletePost(this.props.post.id);
    }

    backToHomePage = () => {
        this.props.history.push('/');
    }

    changePostsOrderMethod = (e) => {
        this.props.changePostsOrderMethod(e.target.value);
    }

    render() {
        return (
            this.props.location.pathname === "/" ?
            <div className="load-top-bar w3-orange w3-text-white" style={{zIndex: '2', display: 'flex', alignItems: 'center', fontSize: '1.2em', position: 'fixed', top: '0px', left: '0px', width: '100%'}}>
                <div onClick={() => this.props.fetchPosts('all')} className="w3-button w3-hover-black w3-padding-16">All</div>
                {
                    this.props.categories.map((category, index) => (
                        <div onClick={() => this.props.fetchPosts(category.name)} key={category.name + index} className="w3-button w3-hover-black w3-padding-16">{category.name.slice(0, 1).toUpperCase() + category.name.slice(1)}</div>
                    ))
                }
                <div style={{flex: '1'}}>
                    <select value={this.props.postsOrderMethod} onChange={this.changePostsOrderMethod} style={{padding: '5px 5px', border: 'none', float: 'right', marginRight: '7px'}}>
                        <option>vote-score</option>
                        <option>timestamp</option>
                    </select>
                </div>
            </div>
            :
            <div className="load-top-bar w3-orange w3-text-white w3-container w3-padding-16" style={{position: 'relative', zIndex: '2', display: 'flex', alignItems: 'center', fontSize: '1.2em'}}>
                {
                    this.state.showSelect ?
                    <div className="drop-down w3-black w3-container" style={{position: 'absolute', right: '25px', bottom: '-73px', paddingTop: '10px', paddingBottom: '10px'}}>
                        <div style={{width: '0px', height: '0px', position: 'absolute', right: '0px', top: '-8px', borderWidth: '0px 0px 8px 8px', borderStyle: 'solid', borderColor: 'transparent transparent black transparent'}}></div>
                        <div onClick={this.shouldShowEditPostView} className="drop-down-icon">Edit</div>
                        <div onClick={this.deletePost} className="drop-down-icon">Delete</div>
                    </div>
                    : null
                }
                <BackIcon onClick={this.backToHomePage} className="w3-xxlarge w3-text-white hoverable w3-hover-text-black"/>
                <OptionIcon onClick={this.shouldShowSelect} className="w3-xxlarge w3-text-white hoverable w3-hover-text-black" style={{position: 'absolute', right: '5px'}}/>
            </div>
        )
    }
}

const mapStateToProps = ({categoriesReducer, postsReducer, appReducer}) => ({
    categories: categoriesReducer.categories,
    post: postsReducer.post,
    postsOrderMethod: appReducer.postsOrderMethod
})

const mapDispatchToProps = ((dispatch) => ({
    shouldShowEditPostView: () => dispatch(shouldShowEditPostView()),
    changePostsOrderMethod: (orderMethod) => dispatch(changePostsOrderMethod(orderMethod))
}))

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopBar));
