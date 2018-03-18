import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Item, Divider, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { removeProductFromCart } from './redux/actions';

export class SimpleNav extends PureComponent {
  static propTypes = {
    routes: PropTypes.array.isRequired,
  };

  handleRemove(product) {
    this.props.actions.removeProductFromCart(product);
  }

  renderLinks(items, basePath) {
    return (
      <ul>
        {items.reduce((prev, item) => {
          if (item.autoIndexRoute) return prev;

          let path;
          if (/^\//.test(item.path)) {
            path = item.path;
          } else if (basePath === '/') {
            path = `/${item.path}`;
          } else {
            path = `${basePath}/${item.path}`;
          }

          prev.push(
            <li key={path}>
              <Link to={path}>{item.name || item.path}</Link>
            </li>,
          );

          if (item.childRoutes && item.childRoutes.length) {
            prev.push(<li key={`${path}_wrapper`}>{this.renderLinks(item.childRoutes, path)}</li>);
          }

          return prev;
        }, [])}
      </ul>
    );
  }

  render() {
    const { cart } = this.props.home;
    let total = 0;

    this.props.home.cart.map(item => (total += item.price));
    return (
      <div className="home-simple-nav">
        {this.renderLinks(this.props.routes[0].childRoutes, '')}
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
