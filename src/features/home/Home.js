import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Button, Loader, Divider, Header } from 'semantic-ui-react';
import { RestaurantType } from './';

import { loadRestaurantsByType } from './redux/actions';

export class Home extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentWillMount() {
    // check whys this is not calling in the interceptor
    this.props.actions.loadRestaurantsByType();
  }

  render() {
    const { loadRestaurantsByGpsPositionPending, restaurantTypeList } = this.props.home;

    const { loadRestaurantsByType } = this.props.actions;
    return (
      <Container fluid textAlign="center">
        <Header as="h1" color="blue">
          Select Your perfect type of restaurant!
        </Header>
        <Button
          positive
          fluid
          disabled={loadRestaurantsByGpsPositionPending}
          content={loadRestaurantsByGpsPositionPending ? 'Fetching...' : 'Reload Cousines'}
          onClick={loadRestaurantsByType}
        />
        <Divider />
        {loadRestaurantsByGpsPositionPending ? (
          <Loader active inline="centered" size="massive" />
        ) : (
          <RestaurantType list={restaurantTypeList} logged={this.props.home.loggedIn} />
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
    actions: bindActionCreators({ loadRestaurantsByType }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
