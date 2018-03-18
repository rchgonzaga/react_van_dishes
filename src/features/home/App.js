import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SimpleNav from './SimpleNav';
import routeConfig from '../../common/routeConfig';
import LoginForm from '../common/LoginForm';

/*
  This is the root component of your app. Here you define the overall layout
  and the container of the react router. The default one is a two columns layout.
  You should adjust it according to the requirement of your app.
*/
export class App extends Component {
  static propTypes = {
    children: PropTypes.node,
    home: PropTypes.object.isRequired
  };

  static defaultProps = {
    children: 'No content.',
  };

  render() {
    return (
      <div className="home-app">
        <div className="sidebar">
          {this.props.home.loggedIn
            ? (
              <div>
                <h1>{this.props.home.userName}</h1>
                <SimpleNav routes={routeConfig} />
              </div>
              )
            : <LoginForm message={this.props.home.loggedInMsg} />
          }
        </div>
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
    home: state.home
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
