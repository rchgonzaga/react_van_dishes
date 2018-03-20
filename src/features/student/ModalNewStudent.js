import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, Form, Button, Header, Icon } from 'semantic-ui-react';
import * as actions from './redux/actions';

export class ModalNewStudent extends Component {
  static propTypes = {
    student: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };
  handleClose = () => this.props.actions.closeModalNewStudent();
  render() {
    const StudentForm = () => (
      <Form>
        <Form.Group>
          <Form.Input label="First name" placeholder="First Name" width={6} />
          <Form.Input label="Middle Name" placeholder="Middle Name" width={4} />
          <Form.Input label="Last Name" placeholder="Last Name" width={6} />
        </Form.Group>
        <Form.Group>
          <Form.Input placeholder="2 Wide" width={2} />
          <Form.Input placeholder="12 Wide" width={12} />
          <Form.Input placeholder="2 Wide" width={2} />
        </Form.Group>
        <Form.Group>
          <Form.Input placeholder="8 Wide" width={8} />
          <Form.Input placeholder="6 Wide" width={6} />
          <Form.Input placeholder="2 Wide" width={2} />
        </Form.Group>
      </Form>
    );

    return (
      <Modal open={this.props.student.modalNewUserVisible} size="small">
        <Header icon="browser" content={this.props.title} />
        <Modal.Content>
          <StudentForm />
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" inverted onClick={() => this.handleClose()}>
            <Icon name="checkmark" /> Got it
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    student: state.student,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalNewStudent);
