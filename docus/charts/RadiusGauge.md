---
id : RadiusGauge
title: RadiusGauge
description: svg로 구현된 컴포넌트
keywords:
  - RadiusGauge
---

### Name
* RadiusGauge

### Description
* Risk Score가 몇 %인지 나타내는 컴포넌트
* threshold 기준선은 필요시 추가한다.

### Feature
  - [Gradient](#Gradient)
  - [Gauge](#Gauge)
  - [Threshold](#Threshold)
  - [ScorePin](#ScorePin)
  - [ScoreLabel](#ScoreLabel)
  - [CurrentScore](#CurrentScore)

### Structure
  - svg
    - defs
      - linearGradient
        - stop
        - stop
    - g(게이지 전체)
      - path
    - g(threshold 선)
      - path
    - g(score를 가르키는 핀)
      - path
      - circle
    - g(score 라벨)
      - text
      - text
      - text
      - text
      - text
    - g(현재 나타내는 score)
      - text

### Feature Details

#### Terminology
![RadiusGauge](/img/radiusgauge.png)

- 게이지 - score의 전체 구간을 나타냅니다.
- score 핀 - 게이지에서 score를 알려주는 표시입니다.
- threshold 선 - 임계치라는 기준선을 알려주는 표시입니다.
- score 라벨 - score 구간 기준입니다.
- 현재 score - score 핀으로 score 값을 상세히 파악할 수 없기 때문에, score 값을 자세하게 알려줍니다.

#### Gradient
- [디자인 시안](https://zpl.io/awRq4mj)을 보고, 컬러를 적용하였습니다.
- [svg gradient tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Gradients#svglineargradient)을 참고하여 구현하였습니다.

#### Gauge
- 상단의 Structure에서 g/path (게이지전체)를 뜻합니다.
- 게이지에 적용하기 위해서 defs에 정의한 linearGradient의 id인 gaugeGradient를 게이지 전체 path에 `stroke="url(#gaugeGradient)"`로 속성을 정의해주었습니다.
- path의 d 속성은 [MDN Path 문서](https://developer.mozilla.org/ko/docs/Web/SVG/Tutorial/Paths)를 참고하여, 직접 계산하였습니다. 그렇기 때문에 디자인 시안과 100% 일치하지 않습니다. 디자이너분께 svg 파일을 요청하셔서 svg파일의 d 속성을 확인 후, 기존 d 속성을 수정해주세요.
- g의 translate는 svg 영역 기준으로 계산하여 이동하였습니다.

#### Threshold
- [EXI 제플린 문서](https://zpl.io/VK87gy6)에서 threshold를 나타내는 svg 파일을 다운로드하였습니다. src/assets/svg/radiusgauge/img-angulargaugechart-thresholdpointer.svg 파일로 추가해놨습니다.
- RadiusGauge 컴포넌트는 svg로 구현했기 때문에, 추가한 svg파일의 path를 복사해서 붙여놨습니다.
- angleScale 함수는 d3를 이용하였습니다. 0 ~ 1 사이의 score 값을 0 ~ 180의 각도로 매핑해주는 함수입니다.
- g의 translate는 svg 영역 기준으로 계산하여 이동하였습니다.

#### ScorePin
- [EXI 제플린 문서](https://zpl.io/VK87gy6)에서 score pin을 나타내는 svg 파일을 다운로드하였습니다. src/assets/svg/radiusgauge/img-angulargaugechart-gaugepointer.svg 파일로 추가해놨습니다.
- RadiusGauge 컴포넌트는 svg로 구현했기 때문에, 추가한 svg파일의 path를 복사해서 붙여놨습니다.

#### ScoreLabel
- 각 점수구간의 기준을 표현합니다.
- svg의 text를 이용하였으며, x,y 속성은 수학의 삼각함수를 이용하였습니다.
- 원중심을 기점으로 sin과 cos을 이용하여 좌표를 계산하였습니다.

#### CurrentScore
- score props를 나타냅니다.
- score props는 number이기 때문에, 문자열로 변환하였습니다.
