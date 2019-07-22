import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import SummaryCard from '../src/components/card/SummaryCard';

storiesOf('SummaryCard Component', module)
  .addDecorator(withKnobs)
  .add('basic', () => (
    <SummaryCard
      data={{
        "Follow-up Patients": 24764,
        "High Risk Patients": 4833,
        "A.I. Analysis Features": 780,
        "Total Patients": 572811
      }} 
    />
  ))
