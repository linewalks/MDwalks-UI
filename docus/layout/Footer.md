---
id : Footer
title: Footer
description: Layout의 Footer 영역을 템플릿화 해놓은 컴포넌트
keywords:
  - Layout
  - Template
  - Footer
---

### Name
* Footer

### Description
* Footer는 Layout을 구성하는 기본요소로 하단에 위치하며 페이지의 기본 정보를 포함하고 있다.
* (en)Footer is a basic element that composes a layout and is located at the bottom and contains basic information of the page.

### Feature
  - [FooterBox](#footer-box)
  - [WrapFooter](#wrap-footer)
  
### Structure
  - FooterWrap
    - FooterBox
      - p

### Feature Details

#### footer box
- 기본 border 형태와 font, variables에 상수화되어있는 높이와 폰트 형태를 지닌다.

#### wrap footer
- Footer를 Wrapping하는 styled-component로 absolute 로 설정하여 정해진 위치에 컴포넌트를 그려준다.