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

   |  Name |  Type  | Default | Range   |  Description        | 
   |:------|:-------|:--------|:------- |:--------------------|
   | selectedElement | Array |   []     |   | Text Collection of Card Element |

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

   |  Name |  Type  | Default | Range   |  Description        | 
   |:------|:-------|:--------|:------- |:--------------------|
   | data | Object |         |   | Summary Card Information |