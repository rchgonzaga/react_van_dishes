import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SimpleNav from './SimpleNav';
import routeConfig from '../../common/routeConfig';
import LoginForm from './LoginForm';

export class App extends Component {
  static propTypes = {
    children: PropTypes.node,
    home: PropTypes.object.isRequired,
  };

  static defaultProps = {
    children: 'No content.',
  };

  render() {
    return (
      <div className="home-app">
        <div className="sidebar">
          {this.props.home.loggedIn ? (
            <div>
              <h1>{this.props.home.userName}</h1>
              <SimpleNav routes={routeConfig} />
            </div>
          ) : (
            <LoginForm home={this.props.home} />
          )}
        </div>

        {/* I don't need this, but i'm trying something :) {React.cloneElement(this.props.children, { loggedIn: this.props.home.loggedIn })} */}
        <div className="page-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({}, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
