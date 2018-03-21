import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { SyncValidationForm } from 'src/features/student/SyncValidationForm';

describe('student/SyncValidationForm', () => {
  it('renders node with correct class name', () => {
    const props = {
      student: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <SyncValidationForm {...props} />
    );

    expect(
      renderedComponent.find('.student-sync-validation-form').getElement()
    ).to.exist;
  });
});
