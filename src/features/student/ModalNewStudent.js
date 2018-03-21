import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, Button, Header, Icon } from 'semantic-ui-react';
import * as actions from './redux/actions';
import NewStudentForm from './NewStudentForm';

export class ModalNewStudent extends Component {
  static propTypes = {
    student: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.actions.loadGenreList();
  }

  handleClose = () => this.props.actions.closeModalNewStudent();

  submit = (values) => {
    // print the form values to the console
    console.log(values);
    this.props.actions.saveNewStudent(values);

    if (this.props.student.saveNewStudentPending !== null) {
      this.props.actions.loadStudentList();
    }
  };

  render() {
    return (
      <Modal open={this.props.student.modalNewUserVisible} size="fullscreen">
        <Header icon="browser" content={this.props.title} />
        <Modal.Content scrolling>
          <NewStudentForm
            onSubmit={this.submit}
            genreList={this.props.student.genreList}
            schoolsList={this.props.student.schoolsList}
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
