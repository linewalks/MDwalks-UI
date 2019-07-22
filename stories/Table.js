import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Table from '../src/components/table/Table';

storiesOf('Table Component', module)
.addDecorator(withKnobs)
.add('score: 0', () => (
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
