import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import BackIcon from 'react-icons/lib/fa/arrow-left';
import OptionIcon from 'react-icons/lib/fa/ellipsis-v';

class TopBar extends Component {
    backToHomePage = () => {
        this.props.history.push('/');
    }
    render() {
        return (
            this.props.location.pathname === "/" ?
            <div className="w3-orange w3-text-white" style={{zIndex: '10000', display: 'flex', alignItems: 'center', fontSize: '1.2em', position: 'fixed', top: '0px', left: '0px', width: '100%'}}>
                <div onClick={() => this.props.fetchPosts('all')} className="w3-button w3-hover-black w3-padding-16">All</div>
                {
                    this.props.categories.map((category, index) => (
                        <div onClick={() => this.props.fetchPosts(category.name)} key={category.name + index} className="w3-button w3-hover-black w3-padding-16">{category.name.slice(0, 1).toUpperCase() + category.name.slice(1)}</div>
                    ))
                }
                <div style={{flex: '1'}}>
                    <select value={this.props.orderMethod} onChange={this.props.handleOrderMethodChange} style={{padding: '5px 5px', border: 'none', float: 'right', marginRight: '7px'}}>
                        <option>vote-score</option>
                        <option>timestamp</option>
                    </select>
                </div>
            </div>
            :
            <div className="w3-orange w3-text-white w3-container w3-padding-16" style={{position: 'relative', zIndex: '10000', display: 'flex', alignItems: 'center', fontSize: '1.2em'}}>
                <BackIcon onClick={this.backToHomePage} className="w3-xxlarge w3-text-white hoverable w3-hover-text-black"/>
                <OptionIcon onClick={this.props.shouldShowEditPostView} className="w3-xxlarge w3-text-white hoverable w3-hover-text-black" style={{position: 'absolute', right: '5px'}}/>
            </div>
        )
    }
}

const mapStateToProps = ({categoriesReducer}) => ({
    categories: categoriesReducer.categories
})

export default withRouter(connect(mapStateToProps)(TopBar));
