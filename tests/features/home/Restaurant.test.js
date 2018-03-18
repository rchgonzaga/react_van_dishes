import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Restaurant } from 'src/features/home/Restaurant';

describe('home/Restaurant', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Restaurant {...props} />
    );

    expect(
      renderedComponent.find('.home-restaurant').getElement()
    ).to.exist;
  });
});
