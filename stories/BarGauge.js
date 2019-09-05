import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs';
import BarGauge from '@Charts/BarGauge';

storiesOf('BarGauge Component', module)
  .addDecorator(withKnobs)
  .add('Controller', () => {

    const defaultValue = 50;
    const options = {
      range: true,
      min: -10,
      max: 110,
      step: 10,
    };

    const score = number('Score', defaultValue, options);

    return (
      <div>
        <p>범위는 0~100 까지 입니다.</p>
        <p>조작은 하단 Knobs Tab 에서 할 수 있습니다.</p>
        <BarGauge score={score} />
      </div>
    )
  })
  .add('Invalid Score', () => (
    <BarGauge score={120} />
  ))
