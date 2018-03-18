import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox, Form, Message, Container } from 'semantic-ui-react';

export default class LoginForm extends Component {
  static propTypes = {
    message: PropTypes.object.isRequired,
  };

  render() {
    const msg = this.props.message;
    return (
      <Container textAlign="center">
        <Message error content={msg} />
        <Form>
          <Form.Field>
            <input placeholder="User" />
          </Form.Field>
          <Form.Field>
            <input placeholder="Password" type="password" />
          </Form.Field>
          <Form.Field>
            <Checkbox label="Keep logged" />
          </Form.Field>
          <Button type="submit" fluid>Login</Button>
        </Form>
      </Container>
    );
  }
}
