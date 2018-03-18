import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, Image, Container, Icon, Popup, Button, Grid, Header } from 'semantic-ui-react';
import { addProductToCart } from './redux/actions';

export class ProductList extends Component {
  static propTypes = {
    list: PropTypes.array,
  };

  static defaultProps = {
    list: [],
  };

  constructor(props) {
    super(props);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  handleAddToCart(product) {
    this.props.actions.addProductToCart(product);
    console.log(this.props.home.cart);
  }

  render() {
    return (
      <Container textAlign="left">
        <Card.Group itemsPerRow={3}>
          {this.props.list.length > 0 ? (
            this.props.list.map(item => (
              <Card key={item.id}>
                <Image src="http://www.scottshotelkillarney.com/files/hotel/hotel-a/03-dining/food-guiness2.jpg" />
                <Card.Content>
                  <Card.Header>
                    <Link to={`/restaurant/${item.id}`}>{item.name}</Link>
                  </Card.Header>
                  <Card.Description>{item.description}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Grid columns={2} divided>
                    <Grid.Row>
                      <Grid.Column>
                        <Header size="large">
                          <Icon name="money" />$ {item.price}
                        </Header>
                      </Grid.Column>
                      <Grid.Column>
                        <Button
                          color="green"
                          icon="add to cart"
                          content="Add to cart"
                          fluid
                          size="mini"
                          onClick={() => this.handleAddToCart(item)}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Card.Content>
              </Card>
            ))
          ) : (
            <p>Loading types of restaurants ...</p>
          )}
        </Card.Group>
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
    actions: bindActionCreators({ addProductToCart }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
