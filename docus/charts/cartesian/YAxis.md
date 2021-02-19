---
id : YAxis
title: YAxis
description: ReChart에서 제공하는 YAxis를 커스텀한 YAxis이다.
keywords:
  - YAxis
---

### Name
* YAxis

### Description
* 기본적으로 [Rechart의 YAxis](https://recharts.org/en-US/api/YAxis)를 사용하여 구현했습니다.

### Feature
  - [YAxis](#YAxis)
  - [YAxis.displayName](YAxis.displayName)

### Structure
  - YAxis

### Feature Details

#### YAxis
- 사내 디자인 시스템에 맞도록 defaultProps를 변경하였고, 재사용성을 위하여 커스텀하였습니다.

#### YAxis.displayName
- 테스트코드에서 사용하는 `components/__tests__/utils`에서 getChilds에서 find하기 위해 displayName을 속성으로 넣어줬다.
