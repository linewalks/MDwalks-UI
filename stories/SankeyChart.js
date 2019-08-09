import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import SankeyChart from '@Charts/SankeyChart';
import sankeyData from '@Data/dataForSankey';

storiesOf('Sankey Chart Component', module)
  .addDecorator(withKnobs)
  .add('basic', () => (
    <SankeyChart
      data={sankeyData}
    />
  ))
  .add('handles onNodeClick events', () => (
    <SankeyChart
      data={sankeyData}
      onNodeClick = {
        action('Node has been clicked')
      }
    />
  ))
  .add('handles onLinkClick events', () => (
    <SankeyChart
      data={sankeyData}
      onLinkClick = {
        action('Link has been clicked')
      }
    />
  ))
  .add('without any data', () => <SankeyChart /> )