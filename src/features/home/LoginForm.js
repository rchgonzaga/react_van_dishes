import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Checkbox, Form, Message, Container } from 'semantic-ui-react';
import * as actions from './redux/actions';

export class LoginForm extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
  };

  render() {
    const msg = this.props.home.loggedInMsg;
    const { userLoggedInSucessfuly, userLoggedOutSucessfuly } = this.props.actions;
    return (
      <Container textAlign="center">
        <Message error content={msg} />
        <Form>
          <Form.Field>
            <input placeholder="User" />
          </Form.Field>
          <Form.Field>
            <input placeholder="Password" />
          </Form.Field>
          <Form.Field>
            <Checkbox label="Keep logged" />
          </Form.Field>
          <Button type="submit" fluid onClick={userLoggedInSucessfuly}>
            Login
          </Button>

          <button className="btn-plus-one" onClick={userLoggedOutSucessfuly}>
            Logout
          </button>
        </Form>
      </Container>
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
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
