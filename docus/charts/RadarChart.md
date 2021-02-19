---
id : RadarChart
title: RadarChart
description: Rechart로 구현된 RadarChart
keywords:
  - RadarChart
---

### Name
* RadarChart

### Description
* [Rechart의 RadarChart Examples](https://recharts.org/en-US/examples/SimpleRadarChart)를 참고하여 구현했습니다.

### Feature
  - [Rechart.PolarGrid](#Rechart.PolarGrid)
  - [Rechart.PolarAngleAxis](#Rechart.PolarAngleAxis)
  - [Rechart.Radar](#Rechart.Radar)
### Structure
  - div
    - common.LegendList
    - Rechart.RadarChart
      - Rechart.Tooltip
      - Rechart.PolarGrid
      - Rechart.PolarAngleAxis
        - Rechart.Radar

### Feature Details

#### Rechart.PolarGrid
- [Rechart.PolarGrid](https://recharts.org/en-US/api/PolarGrid) 문서 참고
- RadarChart의 내부 선

#### Rechart.PolarAngleAxis
- [Rechart.PolarAngleAxis](https://recharts.org/en-US/api/PolarAngleAxis) 문서 참고
- RadarChart의 외부 선 및 Label

#### Rechart.Radar
- [Rechart.Radar](https://recharts.org/en-US/api/Radar) 문서 참고
- RadarChart의 실제 데이터를 나타내는 시각화 라인
