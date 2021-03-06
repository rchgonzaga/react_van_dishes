import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class TestPage extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const { userLoggedInSucessfuly, userLoggedOutSucessfuly } = this.props.actions;
    return (
      <div className="home-test-page">
        Page Content: home/TestPage1
        <br />
        {JSON.stringify(this.props.home)}
        <br />
        {this.props.home.loggedInMsg}
        <br />
        <button className="btn-plus-one" onClick={userLoggedInSucessfuly}>+</button>
        <br />
        <button className="btn-plus-one" onClick={userLoggedOutSucessfuly}>-</button>
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
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestPage);
