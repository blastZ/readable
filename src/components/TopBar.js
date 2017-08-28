import React, { Component } from 'react';
import { connect } from 'react-redux';

class TopBar extends Component {
    render() {
        return (
            <div className="w3-orange w3-text-white" style={{display: 'flex', alignItems: 'center', fontSize: '1.2em'}}>
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
        )
    }
}

const mapStateToProps = ({categoriesReducer}) => ({
    categories: categoriesReducer.categories
})

export default connect(mapStateToProps)(TopBar);
