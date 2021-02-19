---
id : BarChartMulti
title: BarChartMulti
description: Rechart로 구현된 BarChart
keywords:
  - BarChartMulti
---

### Name
* BarChartMulti

### Description
* MDwalks-CLUE에서 스위칭 기간에 따른 처방 패턴을 표현하기 위해 만든 차트
* 기존 BarChart를 여러개 붙인 것이기 때문에 BarChart와 크게 다르지는 않습니다.

### Feature
  - [Rechart.ResponsiveContainer](#Rechart.ResponsiveContainer)
  - [CartesianGrid](#CartesianGrid)

### Structure
  - div
    - commonTag.chartTitle
    - commonTag.LegendList
    - section
      - Box
        - Rechart.ResponsiveContainer
          - Rechart.BarChart
            - CartesianGrid
            - XAxis
            - YAxis
            - Rechart.Tooltip
            - Rechart.Bar
        - div
          - span

### Feature Details

#### Rechart.ResponsiveContainer
- [ResponsiveContainer](https://recharts.org/en-US/api/ResponsiveContainer) 문서 참고

#### CartesianGrid
- [디자인 시안](https://zpl.io/2pGzZ7E)에 맞도록 vertical props에 false를 주었다.
