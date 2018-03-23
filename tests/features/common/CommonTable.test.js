import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { CommonTable } from 'src/features/common';

describe('common/CommonTable', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <CommonTable />
    );

    expect(
      renderedComponent.find('.common-common-table').getElement()
    ).to.exist;
  });
});
