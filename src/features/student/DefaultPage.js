import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Header, Button, Divider, Loader } from 'semantic-ui-react';
import * as actions from './redux/actions';
import StudentList from './components/StudentList';
import ModalNewStudent from './components/ModalNewStudent';

export class DefaultPage extends Component {
  static propTypes = {
    student: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.actions.loadStudentList();
    this.props.actions.loadSchoolList();
  }

  handleOpenNewStudentModal() {
    this.props.actions.showModalNewStudent();
  }

  handleRefreshStudentList() {
    this.props.actions.loadStudentList();
  }

  render() {

    const { saveNewStudentPending, userSaved, saveNewStudentError, loadStudentListPending } = this.props.student;

    let msg = (saveNewStudentPending ? 'Saving student' : (userSaved === true && saveNewStudentError === null ? 'New Student' : 'Something went wrong :S'));

    return (
      <Container>
        <ModalNewStudent title={msg} />
        <Header as="h1" color="blue">
          List of Students
          { loadStudentListPending ? <Loader active inline /> : '' }
        </Header>
        <Button.Group fluid>
          <Button onClick={() => this.props.history.goBack()}>Cancel</Button>
          <Button.Or />
          <Button color="blue" onClick={() => this.handleRefreshStudentList()}>
            Refresh Students
          </Button>
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
