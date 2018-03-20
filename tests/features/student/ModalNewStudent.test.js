import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { ModalNewStudent } from 'src/features/student/ModalNewStudent';

describe('student/ModalNewStudent', () => {
  it('renders node with correct class name', () => {
    const props = {
      student: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ModalNewStudent {...props} />
    );

    expect(
      renderedComponent.find('.student-modal-new-student').getElement()
    ).to.exist;
  });
});
