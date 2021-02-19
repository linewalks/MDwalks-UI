---
id : LineMergeTimeline
title: LineMergeTimeline
description: d3로 구현된 LineMergeTimeline
keywords:
  - LineMergeTimeline
---

### Name
* LineMergeTimeline

### Description
* [d3](https://d3js.org/)를 이용하여 구현
* 데이터에 대한 시간의 흐름과 환자의 위험도 변화를 시각화하여 만든 차트
* [d3 timeline library](https://github.com/denisemauldin/d3-timeline)와 [d3 timeline example](http://bl.ocks.org/bunkat/2338034), [d3 linechart example](https://www.d3-graph-gallery.com/graph/line_basic.html)을 참고하였다.

### Feature
  - [Terminology](#Terminology)
  - [DataFormat](#DataFormat)
  - [Methods](#Methods)

### Structure
  - div

### Feature Details

#### Terminology
![LineMergeTimeline](/img/linemergetimeline.png)
- XAxis - 타임라인과 라인차트의 공통 x축
- LineYAxis - 라인차트의 y축
- TimelineLabel - 타임라인 데이터의 label을 y축에 표현
- GridLine - 격자선
- Line - 라인차트
- Circle - 데이터의 dataPoints가 년월일이 같으면 원으로 표현된다.(한 시점을 표현)
- Rect - 데이터의 dataPoints가 년월일이 다르면 사각형으로 표현된다.(기간을 표현)
- VerticalLine - x축만 봐서 정확한 날짜를 모르기때문에 날짜를 표시해주는 선이다.
- Overview, Brush - 차트를 브러싱하여 확대하기 위한 창이다.

#### DataFormat
```
lineData: {
  xaxis: [string, ...],
  data: [
    {
      name: string,
      data: [number, ...],
    },
    ...
  ]
},
timeData: [
  {
    dataPoints: [
      {
        startTime: string,
        endTime: string,
      },
      ...,
    ],
    label: [
      string
    ],
    order: number
  },
  ...
]
```
* lineData
  * xaxis - x축 시간 데이터
  * name - y축 데이터 라벨
  * data - y축 데이터

* timeData
  * dataPoints - 차트의 Rect와 Circle을 표현하기 위한 시간 데이터이다.
  * label - 데이터의 명칭을 표현.
  * order - 전체데이터의 순서 표현. 서버에서 데이터를 순서대로 보내주기 위하여 추가된 프로퍼티 입니다.

#### Methods
* render
  * 데이터가 유효하지 않으면 에러메세지 렌더링
  * 데이터가 유효하면 div만 렌더링
    * 왜 div한개만 렌더링 할까?
      * d3는 돔을 직접 조작하는 라이브러리이고, react는 가상돔을 이용하는 라이브러리이다. 직접 돔을 조작하기 위해서는 div tag를 렌더 후, componentDidMount에서 차트를 그려야 한다.
    * ref를 사용하는 이유
      * d3로 select를 할 때, id값도 이용가능하지만, react에서는 직접적인 돔조작을 할 때, ref를 사용하도록 권하고 있다.

* componentDidMount
  * renderLineMergeTimeline
    * 라인차트와 타임라인차트를 그리는 함수
    * `lineDataFormatConvert` - lineData props로 받은 데이터를 d3 라인차트 포맷에 맞게 `{ x: string, y: number }` 형태로 변환해준다. lineData를 props로 넘겨주는 데이터형태는 서버 데이터의 형태가 저렇기 때문이다. 조금더 이차트의 확장성을 생각하면 lineDataFormatConvert이 함수는 props로 넘겨줄 때 사용하는 것으로 변경하는 것이 좋을 것 같다.
    * `getScaleTime` - x축의 Scale을 구하는 함수이다.
    * d3로 차트를 구현할 땐, 보통 g tag로 그룹을 만든 후, 그 내부에 필요한 엘리먼트들을 그린다.
    * x, y축을 만들기 위하여 scale을 생성. scale은 값들을 원하는 다른값으로 매핑해주는 함수이다.
    * createXAxis - x축 scale을 이용하여 x축을 그리는 함수
    * createLineYAxis - y축 스케일을 이용하여, y축을 그리는 함수
    * createLineGrid - 라인차트의 격자선을 그리는 함수
    * createVerticalLine - VerticalLine을 그리는 함수
    * renderLineChart - 라인차트 데이터를 렌더링하는 함수
    * createTimelineXAxis - 타임라인차트의 x축을 그리는 함수
    * createTimelineLabel - 타임라인차트의 y축 라벨을 그리는 함수
    * createTimelineGrid - 타임라인차트의 격자선을 그리는 함수
    * renderTimelineChart - 타임라인 데이터를 렌더링 하는 함수
    * createTimelineOverView - 브러싱을 위한 브러싱 바를 그리는 함수
    * createBrush - 브러시 기능을 생성하는 함수
  * addChartReset
    * 브러싱을 초기화하기 위해 Reset 버튼을 외부에서 id값을 입력받아, d3를 이용하여 이벤트리스너를 등록해준다.

* `this.options` - [디자인 시안](https://zpl.io/bA1LBZB)에 맞춰서, 각 g tag를 translate하기 위한 값들을 추가해놓았다.

* 각 함수들이 무슨일을 하는지 주석으로도 대략적으로 표현해놨기 때문에 주석도 참고해주세요.
