import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Button, Loader, Divider, Header } from 'semantic-ui-react';
import { loadAllDishesByRestaurant } from './redux/actions';
import { ProductList } from './';

export class Restaurant extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentWillMount() {
    // Check if that's correct ...
    this.props.actions.loadAllDishesByRestaurant(this.props.match.params.restaurantId);
  }

  render() {
    const { restaurantId } = this.props.match.params;
    const { loadAllDishesByRestaurantPending, dishesList } = this.props.home;
    const { loadAllDishesByRestaurant } = this.props.actions;
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
            disabled={loadAllDishesByRestaurantPending}
            content={loadAllDishesByRestaurantPending ? 'Fetching...' : 'Reload Products'}
            onClick={() => loadAllDishesByRestaurant(restaurantId)}
          />
        </Button.Group>
        <Divider />
        {loadAllDishesByRestaurantPending ? (
          <Loader active inline="centered" size="massive" />
        ) : (
          <ProductList list={dishesList} />
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
    actions: bindActionCreators({ loadAllDishesByRestaurant }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Restaurant);
