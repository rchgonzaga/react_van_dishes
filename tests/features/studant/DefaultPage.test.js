import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { DefaultPage } from 'src/features/studant/DefaultPage';

describe('studant/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      studant: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.studant-default-page').getElement()
    ).to.exist;
  });
});
