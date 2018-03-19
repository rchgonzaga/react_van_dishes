import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { LoginForm } from 'src/features/home';

describe('home/LoginForm', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <LoginForm />
    );

    expect(
      renderedComponent.find('.home-login-form').getElement()
    ).to.exist;
  });
});
