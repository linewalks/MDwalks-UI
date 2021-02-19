---
id : Timeline
title: Timeline
description: d3로 구현된 Timeline
keywords:
  - Timeline
---

### Name
* Timeline

### Description
* [d3](https://d3js.org/)를 이용하여 구현
* 데이터에 대한 시간의 흐름을 보기위하여 만든 차트
* LineMergeTimeline 이전의 만들어 진것이기 때문에 현재는 사용안한다. 하지만 나중에 사용할 수도 있기 때문에 남겨두었다.
* [d3 timeline library](https://github.com/denisemauldin/d3-timeline)와 [d3 timeline example](http://bl.ocks.org/bunkat/2338034)을 많이 참고하였다.

### Feature
  - [Terminology](#Terminology)
  - [DataFormat](#DataFormat)
  - [Methods](#Methods)

### Structure
  - div

### Feature Details

#### Terminology
![Timeline](/img/timeline.png)
- XAxis - x축
- Lable - 데이터의 label을 y축에 표현
- GridLine - 격자선
- Circle - 데이터의 dataPoints가 년월일이 같으면 원으로 표현된다.(한 시점을 표현)
- Rect - 데이터의 dataPoints가 년월일이 다르면 사각형으로 표현된다.(기간을 표현)
- VerticalLine - x축만 봐서 정확한 날짜를 모르기때문에 날짜를 표시해주는 선이다.
- Overview, Brush - 차트를 브러싱하여 확대하기 위한 창이다.

#### DataFormat
```
[
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
* dataPoints - 차트의 Rect와 Circle을 표현하기 위한 시간 데이터이다.
* label - 데이터의 명칭을 표현.
* order - 전체데이터의 순서 표현. 서버에서 데이터를 순서대로 보내주기 위하여 추가된 프로퍼티 입니다.

#### Methods
* render
  * 데이터가 없으면 renderPlaceholder 메소드를 이용하여, placeholder를 렌더링
  * 데이터가 있으면 div만 렌더링
    * 왜 div한개만 렌더링 할까?
      * d3는 돔을 직접 조작하는 라이브러리이고, react는 가상돔을 이용하는 라이브러리이다. 직접 돔을 조작하기 위해서는 div tag를 렌더 후, componentDidMount에서 차트를 그려야 한다.
    * ref를 사용하는 이유
      * d3로 select를 할 때, id값도 이용가능하지만, react에서는 직접적인 돔조작을 할 때, ref를 사용하도록 권하고 있다.

* componentDidMount
  * renderTimeline
    * 타임라인 차트를 그리는 함수이다. LineMergeTimeline는 개발되면서 각 메소드들이 분리되었지만, Timeline은 d3코드가 한번에 들어가 있다.
    * d3로 차트를 구현할 땐, 보통 g tag로 그룹을 만든 후, 그 내부에 필요한 엘리먼트들을 그린다.
    * x, y축을 만들기 위하여 scale을 생성. scale은 값들을 원하는 다른값으로 매핑해주는 함수이다.
    * y축은 디자인시안에서 없기 때문에, `gLabels` 내부에 그린다. [d3 데이터 문서](https://github.com/d3/d3-selection/blob/v2.0.0/README.md#joining-data)를 참고하면, label을 그리는 방법을 이해할 수 있을 것이다.
    * `gGrid` - 격자선을 그리는 곳이다. 수직 격자선과 수평 격자선을 그리기 위해 `gXAxisGrid`와 `gYAxisGrid`로 나누어서 그렸다. d3 예제들이 이런식으로 격자선을 그려서 두개를 나누어서 그렸다.
    * `focus`와 `verticalLineText` - VerticalLine을 표현하기 위해 만든것이다. d3는 각각 그려주어야하기 때문에 line을 표현하는 focus와 시간을 표현하는 verticalLineText로 나누어서 그렸다.
    * `gTimeline` 전체 영역에 `mouseover`, `mousemove`, `mouseout` 이벤트 핸들러를 추가하여, VerticalLine이 마우스를 올렸을 때 추가되도록 하였다.
    * `gData` - Circle과 Rect를 그리기 위한 영역이다. 타임라인 데이터 형태가 배열이고, 배열 내부의 dataPoints도 배열이기 때문에, forEach를 이용하여 데이터를 순회하면서 Circle과 Rect를 그린다. Circle과 Rect를 각각 그려야 하기 때문에, 각각의 filter함수로 데이터를 필터링하여, 데이터를 joining 시켜주었다.
    * `gOverViewAxis` - 차트를 브러싱하기위한 브러싱바를 표현하는 것이다.
    * `brush 함수` - `gOverViewAxis` 내부에 `gBrush` 영역을 만들어서, brush 함수가 실행되도록 하였다. [d3-brush](https://github.com/d3/d3/blob/master/API.md#brushes-d3-brush)를 참고하여 구현하였다. [brush 예제](https://observablehq.com/@d3/focus-context)를 본다면 코드를 이해하기 수월할 것이다.

* 각 함수들이 무슨일을 하는지 주석으로도 대략적으로 표현해놨기 때문에 주석도 참고해주세요.