# MDwalks-UI

[![Build Status](https://travis-ci.com/linewalks/MDwalks-UI.svg?branch=develop)](https://travis-ci.com/linewalks/MDwalks-UI)

**[Release Notes](https://github.com/linewalks/MDwalks-UI/releases)**

**[History / Changes](CHANGELOG.md)**

**[Migration](migration.md)**

## 1. How to
* install
  ```bash
  yarn
  ```

* build from source
  ```bash
  yarn build
  ```

* run docs
  ```bash
  yarn styleguide
  ```

* run component definition docs
  ```bash
  yarn docstart
  ```

## 2. build
* code build
  ```bash
  yarn build
  ```

* docs build
  ```bash
  yarn build:docs
  ```

## 3. 가이드

## eslint rule 가이드
- .eslintrc 의 수정요청은 이슈를 통해서 한다
- 기존 파일을 수정하지 않는 경우외에는 rule 을 모두 통과해야 한다
- warning 을 해결하기 어려울 시 issue 발급

### commit 가이드
- [사용 예정 lib](https://github.com/conventional-changelog/commitlint)
- [참고 문서](https://www.conventionalcommits.org/ko/v1.0.0-beta.4/)
```
<타입>[적용 범위(선택 사항)]: <설명> // 최대 72 자

[본문(선택 사항)]

[꼬리말(선택 사항)]
```

**예시**
- code reivew 적용
  - improvement(Button): 변경 내용

- eslint 적용
  - improvement(page): eslint 적용
  - improvement(Button): eslint 적용

- refactor
  - refactor(Button): remove
  - refactor(Button): move to /src/com/

- package, lib 변경
  - package(MDwalks-UI): version up

**설명**
- 줄에는 무엇이 달라졌는지 간략하게 기술한다.

**적용 범위**
- 무엇을 수정했는지 적는다
- 예시
  - component name, util function name, folder name
  - 그 외 file name

**설명**
- 간략하게 현재형으로 적는다: 'changed'나 'changes'가 아니라 'change'로 적는다.
- 굳이 첫 문자를 대문자로 적지 않는다.
- 문장 끝에 마침표(.)로 끝내지 않는다.

**본문**
- 간략하게 현재형으로 적는다:
- 기존과 무엇이 달라졌고 왜 수정했는지에 대한 내용이 들어가야 한다.

**타입의 종류**

|Type            |SemVer| Description |
|---|---|---|
|improvement     |     |새로운 기능이나 버그 수정없이 현재 구현체를 개선|
|fix             |PATCH|Bug Fix, API 변경 사항 없이 내부 수정|
|feat            |MINOR|기능 추가, API 변경(하위 호환)|
|BREAKING CHANGE |MAJOR|API 의 변경, 큰 변화|
|refactor        |     |내부적인 리펙토링|
|docs            |     |문서|
|test            |     |테스트 코드|
|chore           |     |그외 자잘한 수정 사항들|
|style           |     |formatting, missing semi colons|
|package         |     |package Update|

**이슈 번호 넣기**
- 이슈 번호는 푸터에 별도 라인으로 넣는다. 이 이슈 라인은 "closes"로 시작한다:
- closes #234

### PR 신청 가이드
  - PR 신청 시  Reviewers 에 TL 을 추가 한다
  - Reviewers 지정 시 PR의 상태는 merge 가 가능한 상태, 작업이 끝난 상태이어야 한다
  - Reviewers 시 보완 할 점이 있다면 코멘트 후 Reviewers 에서 지정을 취소한다

### issue 처리 가이드
### 코드 작성 전
  - issue 작성 시 TL 에게 issue 를 공유하고 테스트 리스트를 같이 작성한다.
  - TL 부재시 스스로 테스트 리스트를 작성하고 코드를 작성한다
  - 테스트 리스트는 코멘트로 남긴다
  - 시각적으로 이상한 점이 없게 수정하여 commit 한다
  - 다른 code 의 이슈라면 티켓을 만들어 알린다

### 코드 처리
  - 특별한 경우(hotfix)를 경우를 제외하고는 feature 로 처리한다
  - `git flow feature start issue.200` // 200 은 이슈 넘버
  - 시각적으로 이상한 점이 없게 수정하여 commit 한다
  - pull-request 를 한다
  - 기능 단위로 commit 한다

### TEST 작성 가이드
  - Test 시 describe, it 또는 메시지는 한글로 작성한다
```
describe('어떤 함수 또는 컴포런트의', () => {
	it('어떤 경우', () => {})
})
```

### 리뷰 가이드
- 리뷰는 테스트에 누락된 경우가 없는지 판단한다
- 로직이 기술 부채를 생성하는지 판단한다
- eslint 를 통과한 형식은 자유롭게 작성한다
- 코멘트가 없는게 잘 못 된게 아니다

### Component 작성 가이드
- component 는 여러 용도를 가진 것이 아니라 한 가지를 아주 잘 하도록 만든다
- highcharts 외에는 styled.component 를 사용한다
- component 지원하는 data structure 와 다른 경우 convert 하여 지원하는 data structure 로 만들어 사용한다

### 2021년 추가 목표
- 어떤 프로젝트에서든 쓰일 수 있도록 사용성을 쉽게 리팩토링
  - className을 이용해 프로젝트에서 쉬벡 Customize 할 수 있도록
  - style props를 이용해 style override 할 수 있도록


## 4. 버전 업 순서
- git checkout -b 'feature/version.up.${버전}'
- yarn version
- git push origin feature/version.up.${버전}
- git push origin --tags
- github 에서 feature/version.up.${버전} -> develop 으로 머지
- github 에서 develop 에서 master 으로 머지
