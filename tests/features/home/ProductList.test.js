import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { ProductList } from 'src/features/home';

describe('home/ProductList', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <ProductList />
    );

    expect(
      renderedComponent.find('.home-product-list').getElement()
    ).to.exist;
  });
});
