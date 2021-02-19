---
id : TreeMap
title: TreeMap
description: Highchart로 구현된 TreeMap
keywords:
  - TreeMap
---

### Name
* TreeMap

### Description
* [Highchart의 TreeMap Examples](https://www.highcharts.com/demo/treemap-large-dataset)를 참고하여 구현했습니다.
* Higchart를 React에서 사용하기 위하여, [highcharts-react-official](https://github.com/highcharts/highcharts-react)를 같이 사용하였습니다.
* EXI에서 환자 상세페이지에서 위험도 예측에 사용한 중요한 변수들을 시각화하기 위해 만들었습니다.
* 시간여유가 되신다면, Highchart로 구현된걸 Rechart로 마이그레이션 해주세요. 이유는 기술스택을 통일하여 유지보수를 편하게 하기 위함입니다.

### Feature
  - [HighchartModule](#HighchartModule)
  - [Options](#Options)
  - [Methods](#Methods)

### Structure
  - div
    - errorMessage
    - renderTreeMap

### Feature Details

#### HighchartModule
- Highchart에서 TreeMap을 구현하기 위해선 Module을 추가해야 합니다.(treemap.js와 heatmap.js)
- [Highchart에서 Module을 추가하는 방법](https://github.com/highcharts/highcharts-react#how-to-add-a-module)은 문서를 참고하면 이해하실 수 있습니다.
- 다만, 회사에서는 Next.js를 사용하기 때문에, Highchart를 Next.js에서 사용하기 위해선 설정이 필요합니다.
- [Highcharts with NextJS](https://github.com/highcharts/highcharts-react#highcharts-with-nextjs) 문서를 참고하여, Module 설정을 추가하였습니다.

#### Options
- constructor 내부의 this.options는 TreeMap을 그릴 때, 필요한 options들입니다.
- 기본적으로는 [Highchart의 TreeMap Examples](https://www.highcharts.com/demo/treemap-large-dataset)를 참고하였습니다.
- 차트 구현의 필요한 부분에 따라서 [Highchart API Reference](https://api.highcharts.com/highcharts/)를 참고하였습니다.
- 데이터 개수가 너무 많아서 TreeMap이 렌더링이 안된다면, [this.options.series[0].animationLimit](https://api.highcharts.com/highcharts/series.treemap.animationLimit)을 참고해주세요.

#### Methods
- checkDataValidation - 데이터 형식이 맞지 않으면, 에러메세지를 렌더
- renderTreeMap - highcharts-react-official 라이브러리를 이용하여, React에 highchart를 렌더링
