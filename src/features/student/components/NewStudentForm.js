// eslint-disable-line import/no-mutable-exports
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Form, Button, Tab, Table, Icon, Checkbox, Container } from 'semantic-ui-react';
import { InputField, SelectField } from '../SemanticUiReduxForm';
import { selectStudent } from '../redux/selectStudent';
import CommonTable from '../../common/CommonTable';

const validate = (values) => {
  const errors = {};
  if (!values.firstname) {
    errors.firstname = 'First name is required';
  }

  if (!values.lastname) {
    errors.lastname = 'Last name is required';
  }

  if (!values.internalcode) {
    errors.internalcode = 'Internal code is required';
  }

  if (!values.score) {
    errors.score = 'Internal code is required';
  }

  if (!values.cpfnumber) {
    errors.cpfnumber = 'Internal code is required';
  }

  if (!values.rgnumber) {
    errors.rgnumber = 'Internal code is required';
  }
  return errors;
};

const panes = [
  {
    menuItem: 'Adresses',
    render: props => (
      <Tab.Pane>
        <Container fluid>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              id="form-subcomponent-shorthand-input-first-name"
              placeholder="First name"
            />
            <Form.Input
              fluid
              id="form-subcomponent-shorthand-input-last-name"
              placeholder="Last name"
            />
          </Form.Group>
        </Container>
        <CommonTable
          data={props.addresslist}
          header={[
            {
              name: 'Cod',
              prop: 'id',
            },
            {
              name: 'City',
              prop: 'city',
            },
            {
              name: 'Address',
              prop: 'address',
            },
            {
              name: 'Number',
              prop: 'number',
            },
            {
              name: 'Neighbor',
              prop: 'neighbor',
            },
            {
              name: 'Zip Code',
              prop: 'zipcode',
            },
            {
              name: 'Complement',
              prop: 'complement',
            },
          ]}
        />
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Emails',
    render: props => (
      <Tab.Pane>
        <CommonTable
          data={props.emaillist}
          header={[
            {
              name: 'Cod',
              prop: 'id',
            },
            {
              name: 'Email',
              prop: 'email',
            },
          ]}
        />
      </Tab.Pane>
    ),
  },
  { menuItem: 'Phones', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
  { menuItem: 'People', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
  { menuItem: 'Finance', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
  { menuItem: 'Products', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
  { menuItem: 'Contacs', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
];

const TabExampleBasic = props => <Tab panes={panes} emaillist={props.emaillist} addresslist={props.addresslist} />;

let NewStudentForm = (props) => {
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    cancelBtn,
    genreList,
    schoolsList,
    emailList,
    addressList,
  } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Field name="firstname" label="First Name" component={InputField} placeholder="User Name" width={6} />
        <Field name="lastname" label="Last Name" component={InputField} placeholder="Last Name" width={6} />
        <Field
          component={SelectField}
          name="genreId"
          label="Genre"
          width={4}
          options={genreList}
          placeholder="Choose One"
        />
      </Form.Group>
      <Form.Group>
        <Field name="internalcode" label="Internal Core" component={InputField} placeholder="Internal Core" width={8} />
        <Field
          component={SelectField}
          name="schoolId"
          label="School"
          width={8}
          options={schoolsList}
          placeholder="Choose One"
        />
      </Form.Group>
      <Form.Group>
        <Field name="score" label="Score" component={InputField} placeholder="Score" width={6} />
        <Field name="cpfnumber" label="Cpf Number" component={InputField} placeholder="Cpf Number" width={6} />
        <Field name="rgnumber" label="Rg Number" component={InputField} placeholder="Rg Number" width={6} />
      </Form.Group>
      <TabExampleBasic emaillist={emailList} addresslist={addressList} />
      <br />
      <Button disabled={submitting}>Submit</Button>
      <Button disabled={pristine || submitting} onClick={reset}>
        Clear Values
      </Button>
      {cancelBtn}
    </Form>
  );
};

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
NewStudentForm = reduxForm({
  form: 'newStudentForm',
  validate,
})(NewStudentForm);

// You have to connect() to any reducers that you wish to connect to yourself
NewStudentForm = connect(
  state => ({
    initialValues: state.student.selectedStudent, // pull initial values from account reducer
  }),
  { load: selectStudent }, // bind account loading action creator
)(NewStudentForm);

export default NewStudentForm;
