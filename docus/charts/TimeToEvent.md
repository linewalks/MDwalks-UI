---
id : TimeToEvent
title: TimeToEvent
description: Rechart로 구현된 TimeToEvent
keywords:
  - TimeToEvent
---

### Name
* TimeToEvent

### Description
* [Rechart의 ScatterChart Examples](https://recharts.org/en-US/examples/SimpleScatterChart)와 [Rechart의 ReferenceLine](https://recharts.org/en-US/api/ReferenceLine)을 참고하여 구현했습니다.
* 데이터의 시간의 간격을 시각화하기 위해 구현된 차트입니다.
* MDwalks-EXI에서 환자과 전체그룹간의 비교를 위해 시각화한 차트입니다.

### Feature
  - [Rechart.ReferenceLine](#Rechart.ReferenceLine)
  - [Methods](#Methods)

### Structure
  - div
    - common.LegendList
    - Rechart.ResponsiveContainer
      - Rechart.ComposedChart
        - CartesianGrid
        - Rechart.Tooltip
        - Rechart.ReferenceLine
        - Rechart.ReferenceLine
        - XAxis
        - YAxis
        - Rechart.ZAxis
        - Rechart.Scatter
    - span

### Feature Details

#### Rechart.ReferenceLine
- CartesianGrid로 [TimeToEvent 시안](https://zpl.io/aRJ3oN0)의 선들을 다 표현하지 못하기 때문에, ReferenceLine으로 수평선을 표현하였습니다.

#### Methods
- appendOrder - 차트 데이터에 order props를 추가해줍니다. [TimeToEvent 시안](https://zpl.io/aRJ3oN0)에서 데이터 순서처럼 Patients 다음 Group이 와야합니다. y축의 domain이 아래쪽부터 0부터 3까지 이기 때문에, order는 거꾸로 추가해줘야 합니다.
- newDataKey - 원형점과 선을 그리기 위한 DataKey 입니다.
- yTicks - [TimeToEvent 시안](https://zpl.io/aRJ3oN0)을 보면 환자와 그룹 2가지만 비교하기 때문에, 수평선은 4개만 필요합니다.
- yDomain - 차트를 그리기 위한 y축 범위입니다. [Rechart XAxis](https://recharts.org/en-US/api/YAxis) 문서를 참고하세요.
- xDomain - 차트를 그리기 위한 x축 범위입니다. [Rechart YAxis](https://recharts.org/en-US/api/XAxis) 문서를 참고하세요.
- rang - 데이터의 최대 년도와 최소년도의 차이를 나타냅니다. 2를 더해준 이유는 최대와 최소 년도가 같을 때, 차트를 표현하기 위함입니다.
- xTicks - x축의 Label을 표현합니다. rang + 1을 한 이유는 [_.range](https://lodash.com/docs/4.17.15#range) 때문입니다.
- customData - ScatterChart에서 ZAxis를 사용하기 때문에 z property를 추가해줬습니다.
- xData.unit Props가 있는 이유는 데이터 단위를 표현해주기 위한 디자인 시안때문입니다. 다른 차트들과 통일시키기 위하여, x축 라벨 중앙 아래쪽 하단으로 바뀌었습니다. 나중에 변경해서 반영해주세요.
