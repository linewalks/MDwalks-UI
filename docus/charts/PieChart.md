---
id : PieChart
title: PieChart
description: Rechart로 구현된 PieChart
keywords:
  - PieChart
---

### Name
* PieChart

### Description
* [Rechart의 PieChart Examples](https://recharts.org/en-US/examples/PieChartWithPaddingAngle)를 참고하여 구현했습니다.

### Feature
  - [Rechart.ResponsiveContainer](#Rechart.ResponsiveContainer)
  - [PieLegend](#PieLegend)
  - [Rechart.Cell](#Rechart.Cell)

### Structure
  - div
    - common.chartTitle
    - Layout
    - common.LegendList
      - Rechart.ResponsiveContainer
        - Rechart.PieChart
          - Rechart.Pie
            - Rechart.Cell
          - Rechart.Tooltip
      - PieLegend
        - ul
          - li
            - Dot
            - font.TextTag
            - font.TextTag

### Feature Details

#### Rechart.ResponsiveContainer
- [ResponsiveContainer](https://recharts.org/en-US/api/ResponsiveContainer) 문서 참고

### PieLegend
- layout props에 따라서 PieLegend의 배치를 바꾼다.
- valueConvertText를 통하여 데이터를 변환한다. isPercent 속성이 있으면 Percent값을 변환하고, 그것이 아니라면 일반적으로 숫자값을 세자리수마다 ,로 나뉘어서 표기한다. 세자리수마다 ,로 나누기 위하여 toLocaleString 메소드를 이용하였다.

### Rechart.Cell
 - [Rechart.Cell](https://recharts.org/en-US/api/Cell) 문서를 참고하여 사용하였다.
 - 데이터마다 파이차트의 영역을 나누기 위해서 사용
