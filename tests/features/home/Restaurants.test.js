import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Restaurants } from 'src/features/home/Restaurants';

describe('home/Restaurants', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Restaurants {...props} />
    );

    expect(
      renderedComponent.find('.home-restaurants').getElement()
    ).to.exist;
  });
});
