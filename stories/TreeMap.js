import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import TreeMap from '@Charts/TreeMap';
import treeMapData from '../src/data/dataForTreeMap'
import Highcharts from 'highcharts';

var points = [],
regionP,
regionVal,
regionI = 0,
countryP,
countryI,
causeP,
causeI,
region,
country,
cause,
causeName = {
    'Communicable & other Group I': 'Communicable diseases',
    'Noncommunicable diseases': 'Non-communicable diseases',
    Injuries: 'Injuries'
};

for (region in treeMapData) {
  if (treeMapData.hasOwnProperty(region)) {
      regionVal = 0;
      regionP = {
          id: 'id_' + regionI,
          name: region,
          color: Highcharts.getOptions().colors[regionI]
      };
      countryI = 0;
      for (country in treeMapData[region]) {
          if (treeMapData[region].hasOwnProperty(country)) {
              countryP = {
                  id: regionP.id + '_' + countryI,
                  name: country,
                  parent: regionP.id
              };
              points.push(countryP);
              causeI = 0;
              for (cause in treeMapData[region][country]) {
                  if (treeMapData[region][country].hasOwnProperty(cause)) {
                      causeP = {
                          id: countryP.id + '_' + causeI,
                          name: causeName[cause],
                          parent: countryP.id,
                          value: Math.round(+treeMapData[region][country][cause])
                      };
                      regionVal += causeP.value;
                      points.push(causeP);
                      causeI = causeI + 1;
                  }
              }
              countryI = countryI + 1;
          }
      }
      regionP.value = Math.round(regionVal / countryI);
      points.push(regionP);
      regionI = regionI + 1;
  }
}

const data = [
  {
    id: "id_0_0", 
    name: "Afghanistan", 
    parent: "id_0"
  },
  {
    id: "id_0_0_0", 
    name: "Communicable diseases", 
    parent: "id_0_0", 
    value: 103
  },
  {
    id: "id_0_0_1", 
    name: "Injuries", 
    parent: "id_0_0", 
    value: 47
  },
  {
    id: "id_0_0_2", 
    name: "Non-communicable diseases", 
    parent: "id_0_0", 
    value: 110
  },
  {
    id: "id_0_1", 
    name: "Bahrain", 
    parent: "id_0"
  },
  {
    id: "id_0_1_0", 
    name: "Communicable diseases", 
    parent: "id_0_1", 
    value: 0
  },
  {
    id: "id_0_1_1", 
    name: "Injuries", 
    parent: "id_0_1",
    value: 0
  },
  {
    id: "id_0_1_2", 
    name: "Non-communicable diseases", 
    parent: "id_0_1", 
    value: 3
  },
  {
    id: "id_0_2", 
    name: "Djibouti", 
    parent: "id_0"
  },
  {
    id: "id_0_2_0", 
    name: "Communicable diseases", 
    parent: "id_0_2", 
    value: 3
  },
  {
    id: "id_0_2_1", 
    name: "Injuries", 
    parent: "id_0_2", 
    value: 1
  },
  {
    id: "id_0_2_2", 
    name: "Non-communicable diseases", 
    parent: "id_0_2", 
    value: 3
  },
  {
    id: "id_0_3", 
    name: "Egypt", 
    parent: "id_0"
  },
  {
    id: "id_0_3_0", 
    name: "Communicable diseases", 
    parent: "id_0_3", 
    value: 64
  },
  {
    id: "id_0_3_1", 
    name: "Injuries", 
    parent: "id_0_3", 
    value: 32
  },
  {
    id: "id_0_3_2", 
    name: "Non-communicable diseases", 
    parent: "id_0_3", 
    value: 476
  },
  {
    id: "id_0_4",
    name: "Iran (Islamic Republic of)", 
    parent: "id_0"
  },
  {
    id: "id_0_4_0", 
    name: "Communicable diseases", 
    parent: "id_0_4", 
    value: 31
  },
  {
    id: "id_0_4_1", 
    name: "Injuries", 
    parent: "id_0_4", 
    value: 40
  },
  {
    id: "id_0_4_2", 
    name: "Non-communicable diseases", 
    parent: "id_0_4", 
    value: 292
  },
  {
    id: "id_0_5", 
    name: "Iraq", 
    parent: "id_0"
  },
  {
    id: "id_0_5_0",
    name: "Communicable diseases", 
    parent: "id_0_5", 
    value: 33
  },
  {
    id: "id_0_5_1", 
    name: "Injuries", 
    parent: "id_0_5", 
    value: 57
  },
  {
    id: "id_0_5_2", 
    name: "Non-communicable diseases", 
    parent: "id_0_5", 
    value:1 
  }
]

storiesOf('TreeMap Component', module)
  .addDecorator(withKnobs)
  .add('basic', () => (
    <TreeMap 
      titile={'TreeMap Basic'}
      data={data}
    />
  ))
