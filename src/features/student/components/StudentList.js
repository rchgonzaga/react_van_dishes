import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { Card, Image, Container, List, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import * as actions from '../redux/actions';

export class StudentList extends Component {
  static propTypes = {
    student: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleClick(student) {
    console.log(this);
    this.props.actions.selectStudent(student);
    this.props.actions.showModalNewStudent();
  }

  render() {
    return (
      <Container textAlign="left">
        <Card.Group itemsPerRow={3}>
          {this.props.student.studentList.length > 0 ? (
            this.props.student.studentList.map(item => (
              <Card key={item.id} onClick={() => this.handleClick(item)}>
                <Card.Content>
                  <Image floated="right" size="mini" src={item.image} />
                  <Card.Header>
                    <Link to={`/student/${item.id}`}>{item.firstname}</Link>
                  </Card.Header>
                  <Card.Meta>
                    {item.firstname} {item.lastname}
                  </Card.Meta>
                  <Card.Description>
                    {item.cpfnumber}
                    <Divider />
                    <List>
                      {item.emails.map(email => (
                        <List.Item icon="users" content={email.email} key={email.email + email.id} />
                      ))}
                    </List>
                  </Card.Description>
                </Card.Content>
              </Card>
            ))
          ) : (
            <p>Loading Students ...</p>
          )}
        </Card.Group>
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

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);
