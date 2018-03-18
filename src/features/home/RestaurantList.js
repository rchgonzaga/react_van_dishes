import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, Image, Container } from 'semantic-ui-react';

export default class RestaurantList extends Component {
  static propTypes = {
    list: PropTypes.array,
  };

  static defaultProps = {
    list: [],
  };

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
