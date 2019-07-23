import { configure } from '@storybook/react';

function loadStories() {
  require('../stories/BarGauge.js')
  require('../stories/RadiusGauge.js')
  require('../stories/SankeyChart.js')
  require('../stories/SelectedCard.js')
  require('../stories/SummaryCard.js')
  require('../stories/Table.js')
}

configure(loadStories, module);