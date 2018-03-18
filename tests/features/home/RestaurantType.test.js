import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { RestaurantType } from 'src/features/home';

describe('home/RestaurantType', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <RestaurantType />
    );

    expect(
      renderedComponent.find('.home-restaurant-type').getElement()
    ).to.exist;
  });
});
