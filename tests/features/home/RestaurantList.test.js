import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { RestaurantList } from 'src/features/home';

describe('home/RestaurantList', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <RestaurantList />
    );

    expect(
      renderedComponent.find('.home-restaurant-list').getElement()
    ).to.exist;
  });
});
