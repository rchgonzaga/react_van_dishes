import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, Button, Header, Icon, Tab, Container } from 'semantic-ui-react';
import * as actions from '../redux/actions';
import NewStudentForm from './NewStudentForm';

export class ModalNewStudent extends Component {
  static propTypes = {
    student: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.actions.loadGenreList();
  }

  handleClose = () => {
    this.props.actions.closeModalNewStudent();
    this.props.actions.loadStudentList();
    this.props.actions.unselectStudent();
  };

  submit = (values) => {
    if (this.props.student.selectedStudent === null) {
      this.props.actions.saveNewStudent(values);
    } else {
      this.props.actions.updateStudent(values);
    }
  };

  render() {
    const { emails, addresses } = (this.props.student.selectedStudent !== null ? this.props.student.selectedStudent : {});
    return (
      <Modal open={this.props.student.modalNewUserVisible} size="fullscreen">
        <Header icon="browser" content={this.props.title} />
        <Modal.Content scrolling>
          <NewStudentForm
            onSubmit={this.submit}
            genreList={this.props.student.genreList}
            schoolsList={this.props.student.schoolsList}
            emailList={emails}
            addressList={addresses}
            cancelBtn={
              <Button color="green" inverted onClick={() => this.handleClose()}>
                <Icon name="checkmark" /> Got it
              </Button>
            }
          />
        </Modal.Content>
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
