import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import RadiusGauge from '@Charts/RadiusGauge';

storiesOf('Radius Gauge Component', module)
.addDecorator(withKnobs)
.add('score: 0', () => (
  <RadiusGauge 
    width={300}
    height={200}
    score={0}
  />
))
.add('score: 0.2', () => (
  <RadiusGauge 
    width={300}
    height={200}
    score={0.2}
  />
))
.add('score: 0.4', () => (
  <RadiusGauge 
    width={300}
    height={200}
    score={0.4}
  />
))
.add('score: 0.6', () => (
  <RadiusGauge 
    width={300}
    height={200}
    score={0.6}
  />
))
.add('score: 0.8', () => (
  <RadiusGauge 
    width={300}
    height={200}
    score={0.8}
  />
))
.add('score: 1', () => (
  <RadiusGauge 
    width={300}
    height={200}
    score={1}
  />
))
.add('Invalid Score', () => (
  <RadiusGauge 
    width={300}
    height={200}
    score={20}
  />
))