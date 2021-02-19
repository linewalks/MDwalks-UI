---
id : Tabs
title: Tabs
description: 
keywords:
  - Layout
  - Template
  - Tab
---

### Name
* Tabs

### Description
* 기본형태의 Tab 컴포넌트입니다. Title 탭과 Category 탭 두 종류를 지원하며, 탭 하위에 탭을 추가하여 사용할 수 있습니다.
* (en)This is a basic tab component. It supports two types of title tab and category tab, and can be used by adding a tab under the tab.

### Feature
  - [typeCategory](#typeCategory)
  - [typeTitle](#typeTitle)
  - [TabUnderLine](#TabUnderLine)
  - [changeTab](#changeTab)
  
### Structure
  - article
    - TabBox
      - Tab
        - child
        - TabUnderLine

### Feature Details

#### typeCategory
- Tabs의 기본형인 Category 타입을 css로 정의한 것입니다.
- Tabs를 2단으로 사용하는 경우 2단에 위치합니다.

#### typeTitle
- Tabs의 확장형인 Title 타입을 css로 정의한 것입니다.
- Tabs를 기본형으로 사용할 때는 사용되지 않으며, 2단으로 사용할 경우 1단에 위치합니다.

#### TabUnderLine
- Tabs의 underline을 나타내는 요소로 styled-component로 구현되어 있으며, Category 형태에만 노출되고 Title의 경우는 노출되지 않는 형태로 구현되어 있습니다.

#### changeTab
- selectKey를 인자로 전달받아서 특정 탭을 활성화 시키는 함수입니다.
- 내부 state인 activeKey를 제어합니다.