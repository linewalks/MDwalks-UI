import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, array } from '@storybook/addon-knobs';
import SelectedCard from '@Card/SelectedCard';

storiesOf('SelectedCard Component', module)
  .addDecorator(withKnobs)
  .add('Controller', () => {
    const label = 'Styles';
    const defaultValue = ['Red', 'Orange'];
    const separator = ' ';
    const value = array(label, defaultValue, separator);

    return (
      <div>
        <p>Red Orange은 Red 와 Orange 로 구분되어 표현 됩니다.</p>
        <p>뛰어 쓰기로 구분되어 표현 됩니다.</p>
        <p>조작은 하단 Knobs Tab 에서 할 수 있습니다.</p>
        <SelectedCard selectedElement={value} />
      </div>
    )
  })
  .add('Selected Element of One', () => (
    <SelectedCard selectedElement={['a']} />
  ))
  .add('Selected Element of Multiple', () => (
    <SelectedCard selectedElement={['a', 'b', 'c']} />
  ))
