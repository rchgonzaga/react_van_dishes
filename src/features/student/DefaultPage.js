import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Header, Button, Divider } from 'semantic-ui-react';
import * as actions from './redux/actions';
import StudentList from './StudentList';
import ModalNewStudent from './ModalNewStudent';

export class DefaultPage extends Component {
  static propTypes = {
    student: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.actions.loadStudentList();
  }

  handleNewStudent() {
    alert('New Student');
  }

  handleOpenNewStudentModal() {
    this.props.actions.showModalNewStudent();
  }

  render() {
    return (
      <Container>
        <ModalNewStudent />
        {JSON.stringify(this.props.student.modalNewUserVisible)}
        <Header as="h1" color="blue">
          Select Your perfect type of restaurant!
        </Header>
        <Button.Group fluid>
          <Button onClick={() => this.props.history.goBack()}>Cancel</Button>
          <Button.Or />
          <Button positive content="Add new Student" icon="users" onClick={() => this.handleOpenNewStudentModal()} />
        </Button.Group>
        <Divider />
        <StudentList />
      </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultPage);
