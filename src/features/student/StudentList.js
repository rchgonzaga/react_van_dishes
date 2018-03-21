import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card, Image, Container, TransitionablePortal, Segment, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import * as actions from './redux/actions';

const transitions = [
  'browse',
  'browse right',
  'drop',
  'fade',
  'fade up',
  'fade down',
  'fade left',
  'fade right',
  'fly up',
  'fly down',
  'fly left',
  'fly right',
  'horizontal flip',
  'vertical flip',
  'scale',
  'slide up',
  'slide down',
  'slide left',
  'slide right',
  'swing up',
  'swing down',
  'swing left',
  'swing right',
];

export class StudentList extends Component {
  static propTypes = {
    student: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = { animation: transitions[0], duration: 500, open: false };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleClick = () => this.setState({ open: !this.state.open });

  render() {

    const { animation, duration, open } = this.state

    return (
      <Container textAlign="left">
        <Card.Group itemsPerRow={3}>
          {this.props.student.studentList.length > 0 ? (
            this.props.student.studentList.map(item => (
              <Card key={item.id} onClick={this.handleClick}>
                <TransitionablePortal open={open} transition={{ animation, duration }}>
                  <Segment style={{ left: '40%', position: 'fixed', top: '50%', zIndex: 1000 }}>
                    <Header>This is a controlled portal</Header>
                    <p>Portals have tons of great callback functions to hook into.</p>
                    <p>To close, simply click the close button or click away</p>
                  </Segment>
                </TransitionablePortal>
                <Image src="http://www.scottshotelkillarney.com/files/hotel/hotel-a/03-dining/food-guiness2.jpg" />
                <Card.Content>
                  <Card.Header>
                    <Link to={`/student/${item.id}`}>{item.firstname}</Link>
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
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);
