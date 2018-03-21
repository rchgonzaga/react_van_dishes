import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { NewStudentForm } from 'src/features/student/NewStudentForm';

describe('student/NewStudentForm', () => {
  it('renders node with correct class name', () => {
    const props = {
      student: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <NewStudentForm {...props} />
    );

    expect(
      renderedComponent.find('.student-sync-validation-form').getElement()
    ).to.exist;
  });
});
