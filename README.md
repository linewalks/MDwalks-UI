# MDwalks-UI

## 1. How to
* install
  ```bash
  yarn
  ```

* build from source
  ```bash
  yarn build
  ```

* run storybook
  ```bash
  yarn storybook
  ```

## 2. Usage

* ### BarGauge Component

  ![BarGauge](./src/assets/img/BarGauge.png)
  
  ```javascript
  import BarGauge from '<BarGauge Path>'

  const App = () => {
    return (
      <div>
        <BarGauge score={60} />
      </div>
    )
  }
  ```

  * ### Props

   |  Name |  Type  | Default | Range   |  Description        | 
   |:------|:-------|:--------|:------- |:--------------------|
   | score | Number |         | 0 ~ 100 | BarGauge fill width | 


* ### RadiusGauge Component

  ![RadiusGauge](./src/assets/img/RadiusGauge.png)
  
  ```javascript
  import RadiusGauge from '<RadiusGauge Path>'

  const App = () => {
    return (
      <div>
        <RadiusGauge score={0.6} />
      </div>
    )
  }
  ```

  * ### Props

   |  Name |  Type  | Default | Range   |  Description        | 
   |:------|:-------|:--------|:------- |:--------------------|
   | score | Number |         | 0 ~ 1   | RadiusGauge Pin Position |
   | width | Number |         | 0 ~ Infinity | RadiusGauge Horizontal Area |
   | height | Number |        | 0 ~ Infinity | RadiusGauge Vertical Area | 


* Sankey Chart Component

  ![SankeyChart](./src/assets/img/SankeyChart.png)

  ```javascript
  import SankeyChart from '<SankeyChart Path>'
  import data from '<SankeyChart Data Path>'
  const App = () => {
    eventHandler = () => {
      console.log('hello')
    }

    return (
      <div>
        <SankeyChart data={data} onNodeClick={this.eventHandler} />
      </div>
    )
  }
  ```
  * ### Props

   |  Name |  Type  | Default |  Description        | 
   |:------|:-------|:--------|:--------------------|
   | data | Object |         | SankeyChart Data |
   | onNodeClick | Function |         | SankeyChart Node Click Event Handler |
   | onLinkClick | Function |         | SankeyChart Link Click Event Handler | 


* ### SelectedCard Component

  ![SelectedCard](./src/assets/img/SelectedCard.png)
  
  ```javascript
  import SelectedCard from '<SelectedCard Path>'
  
  const App = () => {
    return (
      <div>
        <SelectedCard selectedElement={['a', 'b', 'c']} />
      </div>
    )
  }
  ```

    * ### Props

   |  Name |  Type  | Default | Description        | 
   |:------|:-------|:--------|:--------------------|
   | selectedElement | Array |   []    | Text Collection of Card Element |


* ### SummaryCard Component

  ![SummaryCard](./src/assets/img/SummaryCard.png)
  
  ```javascript
  import SummaryCard from '<SummaryCard Path>'

  const App = () => {
    return (
      <div>
        <SummaryCard  
          data={{
            "Follow-up Patients": 24764,
            "High Risk Patients": 4833,
            "A.I. Analysis Features": 780,
            "Total Patients": 572811
          }}
        />
      </div>
    )
  }
  ```

  * ### Props
   |  Name |  Type  | Default | Description        | 
   |:------|:-------|:------- |:--------------------|
   | data | Object |         | Summary Card Information |


* ### Table

  ![Table](./src/assets/img/Table.png)
  ![Table_nodata](./src/assets/img/Table_nodata.png)
  
  ```javascript
  import Table from '<Table Path>'

  const App = () => {
    return (
      <div>
        <Table 
          data={{
            headers: ['a', 'b', 'c'],
            rowData: [
              {
                'a': 1,
                'b': 2,
                'c': 3
              },
              {
                'a': 4,
                'b': 5,
                'c': 6
              },
              {
                'a': 7,
                'b': 8,
                'c': 9
              },
            ]
          }} 
        />
      </div>
    )
  }
  ```

  * ### Props
   |  Name |  Type  | Default | Description        | 
   |:------|:-------|:------- |:--------------------|
   | data | Object |         | Table Information |


* ### Line Chart Component

  ![LineChart](./src/assets/img/LineChart.png)

  ```javascript
  import LineChart from '<LineChart Path>'
  const App = () => {
    return (
      <div>
        <LineChart
          title={'test'}
          data={[
            {
              "name": "value",
              "data": [
                0.36,
                0.9,
              ]
            }
          ]}
          xAxisCategory={[
            "2030-06-26",
            "2032-07-11",
          ]}
          xAxisTitle={'Date'}
          xAxisTitleAlign={'middle'}
          yAxisTitle={'value'}
          yAxisTitleAlign={'middle'}  
        />
      </div>
    )
  }
  ```

  * ### Props
   |  Name |  Type  | Default | Description        | 
   |:------|:-------|:------- |:--------------------|
   | title | String | 'Line Chart' | Line Chart Title |
   | data | Array |  []   | Line Chart Data |
   | xAxisCategory | Array |         | Line Chart XAxis Category |
   | xAxisTitle | String | 'xAxis' | Line Chart XAxis Title |
   | xAxisTitleAlign | String | 'middle' | Line Chart XAxis Title Position |
   | yAxisTitle | String | 'yAxis' | Line Chart YAxis Title |
   | yAxisTitleAlign | String | ''middle' | Line Chart YAxis Title Position |


   * ### Timeline Component

  ![Timeline](./src/assets/img/Timeline.png)

  ```javascript
  import Timeline from '<Timeline Path>'
  const data = [
    {
      "dataPoints": [
        {
          "start_time": "2015-03-09T13:20:00",
          "end_time": "2015-03-09T13:20:00"
        },
        {
          "start_time": "2015-03-09T14:10:00",
          "end_time": "2015-03-09T14:10:00"
        },
        {
          "start_time": "2015-03-24T12:51:00",
          "end_time": "2015-03-28T12:51:00"
        },
      ],
      "label": [
        "a"
      ],
      "order": 0
    },
    {
      "dataPoints": [],
      "label": [
        "b"
      ],
      "order": 1
    },
    {
      "dataPoints": [
        {
          "start_time": "2015-06-26T00:00:00",
          "end_time": "2015-06-26T00:00:00"
        }
      ],
      "label": [
        "c"
      ],
      "order": 2
    },
    {
      "dataPoints": [
        {
          "start_time": "2015-04-09T00:00:00",
          "end_time": "2017-01-07T00:00:00"
        }
      ],
      "label": [
        "d"
      ],
      "order": 3
    },
  ] 

  const App = () => {
    return (
      <div>
        <Timeline
          data={data}
        />
      </div>
    )
  }

  ```

  * ### Props
  |  Name |  Type  | Default | Description        | 
  |:------|:-------|:------- |:--------------------|
  | data | Array |     | Timeline Data |
