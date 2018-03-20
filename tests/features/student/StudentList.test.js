import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { StudentList } from 'src/features/student/StudentList';

describe('student/StudentList', () => {
  it('renders node with correct class name', () => {
    const props = {
      student: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <StudentList {...props} />
    );

    expect(
      renderedComponent.find('.student-student-list').getElement()
    ).to.exist;
  });
});
