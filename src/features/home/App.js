import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SimpleNav from './SimpleNav';
import routeConfig from '../../common/routeConfig';
import LoginForm from '../common/LoginForm';

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
          <p>Fulano de tal</p>
          {JSON.stringify(this.props.home.loggedInMsg)}
          {this.props.home.loggedIn ? (
            <div>
              <h1>{this.props.home.userName}</h1>
              <SimpleNav routes={routeConfig} />
            </div>
          ) : (
            <LoginForm message={this.props.home.loggedInMsg} />
          )}
        </div>

        {/* I don't need this, but i'm trying something :) */}
        <div className="page-container">
          {React.cloneElement(this.props.children, { loggedIn: this.props.home.loggedIn })}
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
