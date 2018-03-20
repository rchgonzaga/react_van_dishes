import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { DefaultPage } from 'src/features/student/DefaultPage';

describe('student/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      student: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.student-default-page').getElement()
    ).to.exist;
  });
});
