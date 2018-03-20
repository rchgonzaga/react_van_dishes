import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card, Image, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import * as actions from './redux/actions';

export class StudentList extends Component {
  static propTypes = {
    student: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <Container textAlign="left">
        <Card.Group itemsPerRow={3}>
          {this.props.student.studentList.length > 0 ? (
            this.props.student.studentList.map(item => (
              <Card key={item.id}>
                <Image src="http://www.scottshotelkillarney.com/files/hotel/hotel-a/03-dining/food-guiness2.jpg" />
                <Card.Content>
                  <Card.Header>
                    <Link to={`/restaurant/${item.id}`}>{item.firstname}</Link>
                  </Card.Header>
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
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentList);
