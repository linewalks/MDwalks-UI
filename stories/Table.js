import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Table from '@Table/Table';

storiesOf('Table Component', module)
.addDecorator(withKnobs)
.add('basic', () => (
  <Table 
    data={{
      headers: ['a', 'b', 'c'],
      rowData: [
        {
          'a': 1,
          'b': 2,
          'c': 3
        },
        {
          'a': 4,
          'b': 5,
          'c': 6
        },
        {
          'a': 7,
          'b': 8,
          'c': 9
        },
      ]
    }} 
  />
))
.add('with out any rowData', () => (
  <Table 
    data={{
      headers: ['a', 'b', 'c'],
     
    }} 
  />
))