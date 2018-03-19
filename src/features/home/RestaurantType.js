import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, Image, Container, Popup, Button } from 'semantic-ui-react';

export default class RestaurantType extends Component {
  static propTypes = {
    list: PropTypes.array,
    logged: PropTypes.object.isRequired,
  };

  static defaultProps = {
    list: [],
  };

  render() {
    return (
      <Container textAlign="left">
        <Card.Group itemsPerRow={4}>
          {this.props.list.length > 0 ? (
            this.props.list.map(item => (
              <Card key={item.id}>
                <Image src="http://www.scottshotelkillarney.com/files/hotel/hotel-a/03-dining/food-guiness2.jpg" />
                <Card.Content>
                  <Card.Header>
                    {this.props.logged ? (
                      <Link to={`/restaurants/${item.id}`}>{item.name}</Link>
                    ) : (
                      <Popup trigger={<h3>{item.name}</h3>} content="Loggin to see all the dishes" inverted />
                    )}
                  </Card.Header>
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
