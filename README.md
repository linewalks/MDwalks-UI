# MDwalks-UI

**[Release Notes / History / Changes](CHANGELOG.md)**

## 1. How to
* install
  ```bash
  yarn
  ```

* build from source
  ```bash
  yarn build
  ```

* run docz
  ```bash
  yarn docz dev
  ```
  ```
  port 변경 시 doczrc.js 의 portt property 변경
  ```

## 2. build
* code build
  ```bash
  yarn build
  ```

* docz build
  ```bash
  yarn build:docz
  ```

## 3. 가이드

### commit 가이드
[사용 예정 lib](https://github.com/conventional-changelog/commitlint])
[참고 문서](https://www.conventionalcommits.org/ko/v1.0.0-beta.4/)
```
<타입>[적용 범위(선택 사항)]: <설명> // 최대 72 자

[본문(선택 사항)]

[꼬리말(선택 사항)]
```

**설명**
줄에는 무엇이 달라졌는지 간략하게 기술한다.

**적용 범위**
무엇을 수정했는지 적는다. 예를 들어 Button, HistogramChart, Util 

**설명**
간략하게 현재형으로 적는다: 'changed'나 'changes'가 아니라 'change'로 적는다.
굳이 첫 문자를 대문자로 적지 않는다.
문장 끝에 마침표(.)로 끝내지 않는다.

**본문**
간략하게 현재형으로 적는다:
기존과 무엇이 달라졌고 왜 수정했는지에 대한 내용이 들어가야 한다.

**타입의 종류**

|Type            |SemVer| Description |
|---|---|---|
|fix             |PATCH|Bug Fix, API 변경 사항 없이 내부 수정|
|feat            |MINOR|기능 추가, API 변경(하위 호환)|
|BREAKING CHANGE |MAGER|API 의 변경, 큰 변화|
|refactor        |     |내부적인 리펙토링|
|docs            |     |문서|
|test            |     |테스트 코드|
|chore           |     |그외 자잘한 수정 사항들|
|style           |     |formatting, missing semi colons

**이슈 번호 넣기**
이슈 번호는 푸터에 별도 라인으로 넣는다. 이 이슈 라인은 "closes"로 시작한다:
closes #234
  
### PR 신청 가이드
  - PR 신청 시  Reviewers 에 TL 을 추가 한다
  - Reviewers 지정 시 PR의 상태는 merge 가 가능한 상태, 작업이 끝난 상태이어야 한다
  - Reviewers 시 보완 할 점이 있다면 코멘트 후 Reviewers 에서 지정을 취소한다

### issue 처리 가이드
  - issue 작성 시 TL 에게 issue 를 공유하고 테스트 리스트를 같이 작성한다.
  - TL 부재시 스스로 테스트 리스트를 작성하고 코드를 작성한다
  - 테스트 리스트는 코멘트로 남긴다
  - 시각적으로 이상한 점이 없게 수정하여 commit 한다
  - 다른 code 의 이슈라면 티켓을 만들어 알린다

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

### Component 작성 가이드
- component 는 여러 용도를 가진 것이 아니라 한 가지를 아주 잘 하도록 만든다
- highcharts 외에는 styled.component 를 사용한다
- component 지원하는 data structure 와 다른 경우 convert 하여 지원하는 data structure 로 만들어 사용한다