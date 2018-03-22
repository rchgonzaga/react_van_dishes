import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Button, Tab, Table, Icon, Checkbox } from 'semantic-ui-react';
import { InputField, SelectField } from './SemanticUiReduxForm';

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
    menuItem: 'Tab 1',
    render: () => (
      <Tab.Pane>
        <Table compact celled definition>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Cidade</Table.HeaderCell>
              <Table.HeaderCell>Logradouro</Table.HeaderCell>
              <Table.HeaderCell>Numero</Table.HeaderCell>
              <Table.HeaderCell>Bairro</Table.HeaderCell>
              <Table.HeaderCell>CEP</Table.HeaderCell>
              <Table.HeaderCell>Complemento</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell collapsing>
                <Checkbox slider />
              </Table.Cell>
              <Table.Cell>Ribeirão Preto</Table.Cell>
              <Table.Cell>Rua: Antonio Carlos Nero</Table.Cell>
              <Table.Cell>350</Table.Cell>
              <Table.Cell>Casa dos fundos</Table.Cell>
              <Table.Cell>14098-350</Table.Cell>
              <Table.Cell>Perto da padaria</Table.Cell>
            </Table.Row>
          </Table.Body>

          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell colSpan="6">
                <Button floated="right" icon labelPosition="left" primary size="small">
                  <Icon name="user" /> Adicionar Endereço
                </Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Tab.Pane>
    ),
  },
  { menuItem: 'Tab 2', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
  { menuItem: 'Tab 3', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
];

const TabExampleBasic = () => <Tab panes={panes} />;

const NewStudentForm = (props) => {
  const { handleSubmit, pristine, reset, submitting, cancelBtn, genreList, schoolsList } = props;
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
      <TabExampleBasic />
      <br />
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
