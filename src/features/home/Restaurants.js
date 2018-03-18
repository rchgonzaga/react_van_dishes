import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Button, Loader, Divider, Header } from 'semantic-ui-react';
import { loadAllRestaurantsByCousine } from './redux/actions';
import { RestaurantList } from './';

export class Restaurants extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentWillMount() {
    // Check if that's correct ...
    this.props.actions.loadAllRestaurantsByCousine(this.props.match.params.cousineId);
  }

  render() {
    const { cousineId } = this.props.match.params;
    const { loadAllRestaurantsByCousinePending, restaurantList } = this.props.home;
    const { loadAllRestaurantsByCousine } = this.props.actions;
    return (
      <Container fluid textAlign="center">
        <Header as="h1" color="blue">
          Now, select Your restaurant!
        </Header>
        <Button.Group fluid>
          <Button onClick={() => this.props.history.goBack()}>Back</Button>
          <Button.Or />
          <Button
            positive
            disabled={loadAllRestaurantsByCousinePending}
            content={loadAllRestaurantsByCousinePending ? 'Fetching...' : 'Reload Restaurants'}
            onClick={() => loadAllRestaurantsByCousine(cousineId)}
          />
        </Button.Group>
        <Divider />
        {loadAllRestaurantsByCousinePending ? (
          <Loader active inline="centered" size="massive" />
        ) : (
          <RestaurantList list={restaurantList} />
        )}
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
    actions: bindActionCreators({ loadAllRestaurantsByCousine }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Restaurants);
