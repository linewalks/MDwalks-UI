---
id : LineChart
title: LineChart
description: Rechart로 구현된 LineChart
keywords:
  - LineChart
---

### Name
* LineChart

### Description
* [Rechart의 LineChart Examples](https://recharts.org/en-US/examples/SimpleLineChart)를 참고하여 구현했습니다.

### Feature
  - [Rechart.ResponsiveContainer](#Rechart.ResponsiveContainer)
  - [CartesianGrid](#CartesianGrid)
  - [XAxis](#XAxis)
  - [YAxis](#YAxis)
  - [Rechart.Line](#Rechart.Line)

### Structure
  - div
    - common.chartTitle
    - common.LegendList
    - Rechart.ResponsiveContainer
      - Rechart.LineChart
        - CartesianGrid
        - XAxis
          - Rechart.Label
        - YAxis
          - Rechart.Label
        - Rechart.Tooltip
        - Rechart.Line

### Feature Details

#### Rechart.ResponsiveContainer
- [ResponsiveContainer](https://recharts.org/en-US/api/ResponsiveContainer) 문서 참고

#### CartesianGrid
- [디자인 시안](https://zpl.io/2pGzZ7E)에 맞도록 vertical props에 false를 주었다.

#### XAxis
- x축의 tick은 x축 라벨의 위치를 나타내는 점선들이다. 하지만 디자인상 보이지 않게 지웠다.
- xAxisTicks props를 통하여, 원하는 라벨만을 표시하기위해 커스텀하여 표시할 수 있다.
- xAxisTicks 값들이 숫자로 이루어져 있으면, type props에 number를 해줘야 렌더링 된다.

#### Rechart.Label(x축)
- offset은 디자인시안에 맞춰서 구현했다.

#### YAxis
- yAxisTicks props를 통하여, 원하는 라벨만을 표시하기위해 커스텀하여 표시할 수 있다.

#### Rechart.Line
- lineDot props를 통하여, LineChart의 좌표점(원형모양)을 숨기는 여부를 제어하는 것이다.
- connectNulls는 차트의 좌표가 없어도 연결 지어서 그리도록 도와주는 props이다. [예제](https://recharts.org/en-US/examples/LineChartConnectNulls)를 참고하였다.
