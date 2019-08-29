import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs";
import Table from "@Table/Table";
import SelectedCard from '@Card/SelectedCard';
import SankeyChart from "@Charts/SankeyChart";
import sankeyData from "@Data/dataForSankey";

storiesOf("JAMIA", module)
  .addDecorator(withKnobs)
  .add("fig1", () => (
    <div>
      <SankeyChart
        data={sankeyData}
        onNodeClick={action("Node has been clicked")}
      />
      <SelectedCard selectedElement={['a', 'b', 'c']} />
      <Table
        data={{
          headers: ["a", "b", "c"],
          rowData: [
            {
              a: 1,
              b: 2,
              c: 3
            },
            {
              a: 4,
              b: 5,
              c: 6
            },
            {
              a: 7,
              b: 8,
              c: 9
            }
          ]
        }}
      />
    </div>
  ));
