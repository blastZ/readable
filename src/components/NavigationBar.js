import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import BackIcon from 'react-icons/lib/fa/arrow-left';
import OptionIcon from 'react-icons/lib/fa/ellipsis-v';
import { shouldShowEditPostView, changePostsOrderMethod } from '../actions/app_action';

class NavigationBar extends Component {
    changePostsOrderMethod = (e) => {
        this.props.changePostsOrderMethod(e.target.value);
    }

    render() {
        return (
            <div className="load-top-bar w3-orange w3-text-white" style={{zIndex: '2', display: 'flex', alignItems: 'center', fontSize: '1.2em', position: 'fixed', top: '0px', left: '0px', width: '100%'}}>
                <Link to="/" className="w3-button w3-hover-black w3-padding-16">All</Link>
                {
                    this.props.categories.map((category, index) => (
                        <Link to={`/${category.name}`} key={category.name + index} className="w3-button w3-hover-black w3-padding-16">{category.name.slice(0, 1).toUpperCase() + category.name.slice(1)}</Link>
                    ))
                }
                <div style={{flex: '1'}}>
                    <select value={this.props.postsOrderMethod} onChange={this.changePostsOrderMethod} style={{padding: '5px 5px', border: 'none', float: 'right', marginRight: '7px'}}>
                        <option>vote-score</option>
                        <option>timestamp</option>
                    </select>
                </div>
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
    changePostsOrderMethod: (orderMethod) => dispatch(changePostsOrderMethod(orderMethod))
}))

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavigationBar));
