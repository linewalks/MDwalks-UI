---
id : Histogram
title: Histogram
description: d3로 구현된 Histogram
keywords:
  - Histogram
---

### Name
* Histogram

### Description
* [d3](https://d3js.org/)를 이용하여 구현
* [d3 historgram example](https://www.d3-graph-gallery.com/histogram) 문서를 참고하여 구현
* MDwalks-EXI 프로젝트에서 환자 그룹 전체와 환자의 score를 비교하기 위한 시각화 차트

### Feature
  - [Terminology](#Terminology)
  - [DataFormat](#DataFormat)
  - [Methods](#Methods)

### Structure
  - div
    - GDropDown
      - span
      - SelectBox
        - select
          - option

### Feature Details

#### Terminology
![Histogram](/img/histogram.png)
- UnitLabel - y축의 단위 라벨
- XAxis - 차트의 X축
- YAxis - 차트의 Y축
- GridAxis - 차트의 격자선
- MeanLine - 평균 Score를 나타내는 선
- Bar - 구간의 데이터 개수를 나타내는 막대
- Dropdown - Bins의 개수를 선택할 수 있는 박스
- Bins - 구간의 개수

#### DataFormat
```
{
  avgRisk: number,
  patientRisk: number,
  risks: number[],
}
```
* avgRisk - 전체의 평균 score
* patientRisk - 환자 개인의 score
* risks - 전체 score의 모음

#### Methods
* render
  * 데이터의 유효성을 확인하여, 유효하지 않으면, 에러메세지 렌더링
  * 데이터가 있으면 div와 Dropdown 렌더링
    * 왜 div를 렌더링 할까?
      * d3는 돔을 직접 조작하는 라이브러리이고, react는 가상돔을 이용하는 라이브러리이다. 직접 돔을 조작하기 위해서는 div tag를 렌더 후, componentDidMount에서 차트를 그려야 한다.
    * ref를 사용하는 이유
      * d3로 select를 할 때, id값도 이용가능하지만, react에서는 직접적인 돔조작을 할 때, ref를 사용하도록 권하고 있다.

* componentDidMount
  * renderHistogram
    * d3로 구현된 차트들은 d3함수를 이용하여 차트 요소들(x축, y축, 격자선, 평균선, 바, 단위라벨)을 각각 svg 영역에 그룹으로 추가합니다. 그렇기 때문에 histogram 차트를 그리기 위한 모든 요소들(x축, y축, 격자선, 평균선, 바, 단위라벨)을 렌더링 하며, create로 시작하는 메소드들이 실행됩니다.
    * bins - createHistogramData 메소드로 만들어진 Histogram 차트 데이터 입니다. [d3 histogram 문서](https://github.com/d3/d3-array/blob/v2.11.0/README.md#bins)를 참고하시면, 데이터가 어떤식으로 만들어지는지 파악할 수 있습니다. 
      ```js
      [[0.05, 0.07, ..., x0:0, x1:0.1], [0.12, 0.19, ..., x0:0.1, x1:0.2], ..., [0.95, 0.97, ...x0:0.9, x1:1]]
      ```
      * bins 데이터의 예시 입니다.
      * 우리가 구현한 Histogram의 x축의 domain은 0에서 1사이 입니다. binsNumber가 10이면, 0 ~ 1을 10개의 구간으로 나누고, 데이터를 분할합니다. binsNumber가 20이면, `[[.., x0:0.05, x:1:0.1], [..., x0:0.05, x1:0.1], ..., [..., x0:0.95,x1:1]]` 이런식으로 됩니다.
    * tickValues - y축에 라벨에 나타나는 값들이며, e로 나타낸 이유는 숫자가 커질수록 길게쓰기 싫어서입니다. 알아보기 힘드시면 10진수로 바꾸시면 됩니다.
    * formatPower - y축 라벨에 나타내는 값들을 지수로 표현하기 위하여 만든 함수입니다. yAxis의 tickFormat에서 같이 사용됩니다.
  
  * createXAxis
    * x축을 생성하는 함수입니다.
    * [d3 axis 문서](https://github.com/d3/d3-axis/tree/v2.0.0#d3-axis)를 참고하여 구현하였습니다.
    * 디자인 시안에 맞게 `gXAxis.selectAll('.tick line').remove()`를 이용하여, x축 tick 선을 제거하였습니다.
    
  * createYAxis
    * y축을 생성하는 함수입니다.
    * [d3 axis 문서](https://github.com/d3/d3-axis/tree/v2.0.0#d3-axis)를 참고하여 구현하였습니다.
    * 디자인 시안에 맞게 `gYAxis.selectAll('.domain').remove()`를 이용하여, y축 선을 제거하였습니다.

  * createXAxisGridLines
    * 격자선을 생성하는 함수입니다.
    * [d3 axis 문서](https://github.com/d3/d3-axis/tree/v2.0.0#d3-axis)를 참고하여 구현하였습니다.
    * 디자인에 맞도록 x축과 평행한 선만을 나타내기위하여 gridXAxis를 이용했습니다.

  * createLegend
    * 인자를 `...args`로 받은 이유는 legend의 확장성 때문입니다. 현재는 2개의 데이터를 받지만, 2개 이상이 되어도 렌더링되도록 구현하였습니다.
    * `gLegend.selectAll('legendCircle')...`은 원모양을 그려주는 함수입니다.
    * `gLegend.selectAll('legend')...`는 텍스트를 그려주는 함수입니다.

  * createBar
    * histogram 차트 데이터를 이용하여, bar를 렌더링합니다.
    * patientRiskIndex - bis로 받는 Histogram 데이터에서 환자개인의 RiskScore가 속하는 구간의 index를 구하는 것입니다. 
    * `gBar.selectAll('rect')...`
      * transform - [histogram example](https://www.d3-graph-gallery.com/graph/histogram_basic.html) 문서를 참고했습니다. [svg의 rect 기본](https://developer.mozilla.org/ko/docs/Web/SVG/Element/%EC%82%AC%EA%B0%81%ED%98%95)을 이해하셔야 이해하기 편합니다. x와 y의 좌표는 항상 사각형의 왼쪽 최상단 점을 가리킵니다. 그렇기때문에 translate를 시켜주는 것입니다.
      * width - 똑같이 svg의 rect 기본을 이해하시면 됩니다.
      * height - 똑같이 svg의 rect 기본을 이해하시면 됩니다.
  
  * createRiskMeanLine - 평균선을 그리는 함수입니다.
  * createUnitLabel - y축 단위라벨을 그리는 함수입니다.
  * initOnChangeFlag
    * EXI의 환자비교페이지에서 Histogram 차트의 환자의 score가 속하는 구간의 환자수를 부모컴포넌트로 넘겨주기위하여 만든 props 입니다. 다른 좋은 방법이 있다면, 리팩토링 해주세요/

* onChangeHistogram
  * Dropdown의 선택값이 바뀔때 마다 평균선과 Bar를 제거하고, binsNumber에 맞는 histogram 데이터를 생성하여 bar와 평균선만 다시그립니다. 두가지만 다시 그리는 이유는 모든걸 다시그리는 것은 비용소모가 크기 때문입니다.
