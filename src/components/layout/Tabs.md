Tabs example:

```js
import { TabPane, TYPE } from '@Components/layout/Tabs';

<Tabs type={TYPE.TITLE}>
  <TabPane tab="상의">
    <Tabs>
      <TabPane tab="티셔츠">티셔츠</TabPane>
      <TabPane tab="셔츠">셔츠</TabPane>
    </Tabs>
  </TabPane>
  <TabPane tab="하의">
    <Tabs>
      <TabPane tab="반바지">반바지</TabPane>
      <TabPane tab="청바지">청바지</TabPane>
    </Tabs>
  </TabPane>
</Tabs>
```

```js
import { TabPane } from '@Components/layout/Tabs';

<Tabs defaultactivekey="2" onChange={(key) => alert(key)}>
  <TabPane tab="1 pane" key="1">1 contents</TabPane>
  <TabPane tab="2 pane" key="2">2 contents</TabPane>
</Tabs>
```