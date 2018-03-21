import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Button } from 'semantic-ui-react';
import { InputField, SelectField } from './SemanticUiReduxForm';

const validate = (values) => {
  const errors = {};
  if (!values.firstname) {
    errors.firstname = 'First name is required';
  }

  if (!values.lastname) {
    errors.lastname = 'Last name is required';
  }
  return errors;
};

const NewStudentForm = (props) => {
  const { handleSubmit, pristine, reset, submitting, cancelBtn, genreList } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Field name="firstname" label="First Name" component={InputField} placeholder="User Name" width={6} />
        <Field name="lastname" label="Last Name" component={InputField} placeholder="Last Name" width={6} />
        <Field
          component={SelectField}
          name='choose'
          label="Choose One"
          width={4}
          options={genreList}
          onChange={(e, value) => {console.log(e, value);}}
          placeholder="Choose One"/>
      </Form.Group>
      <Form.Group>
        <Form.Input placeholder="2 Wide" width={2} />
        <Form.Input placeholder="12 Wide" width={12} />
        <Form.Input placeholder="2 Wide" width={2} />
      </Form.Group>
      <Form.Group>
        <Form.Input placeholder="8 Wide" width={8} />
        <Form.Input placeholder="6 Wide" width={6} />
        <Form.Input placeholder="2 Wide" width={2} />
      </Form.Group>

      <Button disabled={submitting}>Submit</Button>
      <Button disabled={pristine || submitting} onClick={reset}>
        Clear Values
      </Button>
      {cancelBtn}
    </Form>
  );
};

export default reduxForm({
  form: 'syncValidation', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
})(NewStudentForm);
