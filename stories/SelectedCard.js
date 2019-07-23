import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import SelectedCard from '../src/components/card/SelectedCard';

storiesOf('SelectedCard Component', module)
  .addDecorator(withKnobs)
  .add('Selected Element of One', () => (
    <SelectedCard selectedElement={['a']} />
  ))
  .add('Selected Element of Mutiple', () => (
    <SelectedCard selectedElement={['a', 'b', 'c']} />
  ))
