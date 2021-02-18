---
id : BarChart
title: BarChart
description: Rechart로 구현된 BarChart
keywords:
  - BarChart
---

### Name
* BarChart

### Description
* [Rechart의 BarChart Examples](https://recharts.org/en-US/examples/SimpleBarChart)를 참고하여 구현했습니다.

### Feature
  - [Rechart.ResponsiveContainer](#Rechart.ResponsiveContainer)
  - [CartesianGrid](#CartesianGrid)
  - [XAxis](#XAxis)
  - [YAxis](#YAxis)
  - [Layout](#Layout)

### Structure
  - div
    - commonTag.chartTitle
    - commonTag.LegendList
    - div
      - commonTag.WrapperScrollBars
        - Rechart.ResponsiveContainer
          - Rechart.BarChart
            - CartesianGrid
            - XAxis
              - Rechart.Label
            - YAxis
              - Rechart.Label
            - Rechart.Tooltip
            - Rechart.Bar
              - Rechart.Cell

### Feature Details

#### Rechart.ResponsiveContainer
- [ResponsiveContainer](https://recharts.org/en-US/api/ResponsiveContainer) 문서 참고

#### CartesianGrid
- [디자인 시안](https://zpl.io/2pGzZ7E)에 맞도록 vertical props에 false를 주었다.

#### XAxis
- x축의 tick은 x축 라벨의 위치를 나타내는 점선들이다. 하지만 디자인상 보이지 않게 지웠다.

#### YAxis
- yAxisTicks props를 통하여, 원하는 라벨만을 표시하기위해 커스텀하여 표시할 수 있다.

### Layout
- 레이아웃이 horizontal이면 일반적인 바차트를 렌더링 한다.
- 레이아웃이 vertical이면 높이를 계산해서 렌더링한다.
