import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs';
import RadiusGauge from '@Charts/RadiusGauge';

storiesOf('Radius Gauge Component', module)
  .addDecorator(withKnobs)
  .add('Controller', () => {
    const defaultValue = 50;
    const options = {
      range: true,
      min: -10,
      max: 110,
      step: 1,
    };

    const score = number('Score', defaultValue, options);

    return (
      <div>
        <p>범위는 0~100 까지 입니다.</p>
        <p>조작은 하단 Knobs Tab 에서 할 수 있습니다.</p>
        <RadiusGauge
          width={300}
          height={200}
          score={score/100} />
      </div>
    )
  })
.add('Invalid Score', () => (
  <RadiusGauge 
    width={300}
    height={200}
    score={20}
  />
))