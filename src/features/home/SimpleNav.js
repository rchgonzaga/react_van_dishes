import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Divider, Button, Item, Header, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { removeProductFromCart } from './redux/actions';

export class SimpleNav extends PureComponent {
  static propTypes = {
    routes: PropTypes.array.isRequired,
  };

  handleRemove(product) {
    this.props.actions.removeProductFromCart(product);
  }


  renderLinks() {
    return (
      <ul>
        <li>
          <Link to="/cousines"> <Icon name="home" /> Home</Link>
        </li>
        <li>
          <Link to="/test-page"><Icon name="info circle" /> About us</Link>
        </li>
        <li>
          <Link to="/cousines"><Icon name="user" /> Profile</Link>
        </li>
      </ul>
    );
  }


  render() {
    const { cart } = this.props.home;
    let total = 0;

    this.props.home.cart.map(item => (total += item.price));
    return (
      <div className="home-simple-nav">
        {this.renderLinks()}
        <Divider />
        <h3>Total: $ {total.toFixed(2)}</h3>
        <Item.Group>
          {this.props.home.cart.map(item => (
            <Item key={Date.now()}>
              <Button circular icon="remove" color="red" size="mini" onClick={() => this.handleRemove(item)} />
              <Item.Content verticalAlign="middle">
                <Item.Header>
                  <Header as="h6">{item.name}</Header>
                </Item.Header>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>

        <Button color="green" fluid> Checkout </Button>
      </div>
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
    actions: bindActionCreators({ removeProductFromCart }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SimpleNav);
