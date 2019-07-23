import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import SelectedCard from '@Card/SelectedCard';

storiesOf('SelectedCard Component', module)
  .addDecorator(withKnobs)
  .add('Selected Element of One', () => (
    <SelectedCard selectedElement={['a']} />
  ))
  .add('Selected Element of Multiple', () => (
    <SelectedCard selectedElement={['a', 'b', 'c']} />
  ))
