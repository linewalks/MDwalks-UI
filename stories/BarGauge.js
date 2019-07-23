import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import BarGauge from '@Charts/BarGauge';

storiesOf('BarGauge Component', module)
  .addDecorator(withKnobs)
  .add('0%', () => (
    <BarGauge score={0} />
  ))
  .add('20%', () => (
    <BarGauge score={20} />
  ))
  .add('40%', () => (
    <BarGauge score={40} />
  ))
  .add('60%', () => (
    <BarGauge score={60} />
  ))
  .add('80%', () => (
    <BarGauge score={80} />
  ))
  .add('100%', () => (
    <BarGauge score={100} />
  ))
  .add('Invalid Score', () => (
    <BarGauge score={120} />
  ))
