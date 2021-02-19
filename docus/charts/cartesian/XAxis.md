---
id : XAxis
title: XAxis
description: ReChart에서 제공하는 XAxis를 커스텀한 XAxis이다.
keywords:
  - XAxis
---

### Name
* XAxis

### Description
* 기본적으로 [Rechart의 XAxis](https://recharts.org/en-US/api/XAxis)를 사용하여 구현했습니다.

### Feature
  - [XAxis](#XAxis)
  - [XAxis.displayName](XAxis.displayName)

### Structure
  - XAxis

### Feature Details

#### XAxis
- 사내 디자인 시스템에 맞도록 defaultProps를 변경하였고, 재사용성을 위하여 커스텀하였습니다.

#### XAxis.displayName
- 테스트코드에서 사용하는 `components/__tests__/utils`에서 getChilds에서 find하기 위해 displayName을 속성으로 넣어줬다.
