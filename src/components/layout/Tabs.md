Tabs example:

```js
import { TabPane } from '@Components/layout/Tabs';

const TablExample = () => (
  <>
    <Tabs>
      <TabPane tab="1 pane">1 contents</TabPane>
      <TabPane tab="2 pane">2 contents</TabPane>
    </Tabs>

    <Tabs defaultactivekey="2" onChange={(key) => alert(key)}>
      <TabPane tab="1 pane" key="1">1 contents</TabPane>
      <TabPane tab="2 pane" key="2">2 contents</TabPane>
    </Tabs>
  </>
)

TablExample()
```