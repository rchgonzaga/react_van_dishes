import React from 'react';
import { Table } from 'semantic-ui-react';

const row = (x, i, header) => (
  <Table.Row key={`tr-${i}`}>{header.map((y, k) => <Table.Cell key={`trc-${k}`}>{x[y.prop]}</Table.Cell>)}</Table.Row>
);

export default ({ data, header }) => (
  <Table celled striped>
    <Table.Header />
    <Table.Row>{header.map((x, i) => <Table.HeaderCell key={`thc-${i}`}>{x.name}</Table.HeaderCell>)}</Table.Row>
    <Table.Body>{data.map((x, i) => row(x, i, header))}</Table.Body>
  </Table>
);
