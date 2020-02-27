SankeyChart example:

```js

import Button from '@Components/button/Button';

const SankeyChartExample = () => (
  <>
    <Button id="resetSankeyChart">reset</Button>
    <SankeyChart
      resetBtnId={"resetSankeyChart"}
      onChange={(nodes) => {console.log(nodes)}}
      selectedNodes={['ER Admission', 'Re-operation']}
      data={
        {
          "links": [
            {
              "source": "ER Admission",
              "target": "Re-operation",
              "value": 683
            },
            {
              "source": "Index Invasive Treatment",
              "target": "ER Death",
              "value": 44
            },
            {
              "source": "Re-operation",
              "target": "In Hospital Death",
              "value": 84
            },
            {
              "source": "Re-operation",
              "target": "ER Death",
              "value": 9
            },
          ],
          "nodes": [
            {
              "name": "Index Invasive Treatment"
            },
            {
              "name": "In Hospital Death"
            },
            {
              "name": "ER Admission"
            },
            {
              "name": "Re-operation"
            },
            {
              "name": "ER Death"
            },
          ]
        }
      }
    />
  </>
)

SankeyChartExample()
 ```