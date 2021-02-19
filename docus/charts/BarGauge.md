---
id : BarGauge
title: BarGauge
description: MDwalks-EXI에서 Risk Score를 나타내는 컴포넌트
keywords:
  - BarGauge
---

### Name
* BarGauge

### Description
* Risk Score가 몇 %인지 나타내는 컴포넌트
* threshold 기준선은 필요시 추가한다.

### Feature
  - [score](#Score)
  - [threshold](#Threshold)
  - [theme](#Theme)

### Structure
  - BarGauge
    - Container
      - Threshold
      - FillContainer
        - Fill

### Feature Details

#### Score
- score props는 0 ~ 100 사이의 숫자 값을 받는다.
- FillContainer가 score 값 전체의 회색배경의 컴포넌트이고, Fill이 score를 표현하는 컴포넌트이다. 


#### Threshold
- threshold props는 필수값이 아니다.
- threshold props 값을 받으면, Threshold 컴포넌트로 표현된다.
- 전체 score의 기준선을 의미한다.

#### Theme
- theme은 linewalks 디자인 시스템에 맞춰서 컬러를 구현하였다.
