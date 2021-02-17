---
id : Image
title: Image
description: img 태그의 템플릿 컴포넌트
keywords:
  - Layout
  - Template
  - img
---

### Name
* Image

### Description
* Image 컴포넌트는 img 태그를 감싸는 컴포넌트이다.
* (en)Image component is a component that wraps img tag.

### Feature
  - [Image](#image)
  
### Structure
  - img

### Feature Details

#### image
- 해당 컴포넌트는 img 태그를 감싸는 컴포넌트로 아래와 같은 형태의 props을 받는다.
  ```javascript
  logo {
    src: string;
    alt: string;
    width: number;
    height: number;
  }
  ```
- srcSet을 적용되어 있어 다양한 형태의 사이즈의 이미지를 사용할 수 있습니다.
  - 예시
  ```javascript
    파일명: `img/logo/linewalks.png` 
    // srcSet 적용
    1x: img/logo/linewalks.png
    2x: img/logo/linewalks@2x.png
  ```
