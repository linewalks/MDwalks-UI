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

## 가이드
### PR 신청 가이드
  - PR 신청 시  Reviewers 에 TL 을 추가 한다
  - Reviewers 지정 시 PR의 상태는 merge 가 가능한 상태, 작업이 끝난 상태이어야 한다
  - Reviewers 시 보완 할 점이 있다면 코멘트 후 Reviewers 에서 지정을 취소한다

### issue 처리 가이드
  - issue 작성 시 TL 에게 issue 를 공유하고 테스트 리스트를 같이 작성한다.
  - TL 부재시 스스로 테스트 리스트를 작성하고 코드를 작성한다
  - 테스트 리스트는 코멘트로 남긴다

### TEST 작성 가이드
  - Test 시 describe, it 또는 메시지는 한글로 작성한다
```
describe('어떤 함수 또는 컴포런트의', () => {
	it('어떤 경우', () => {})
})
```

### 리뷰
- 리뷰는 테스트에 누락된 경우가 없는지 판단한다
- 로직이 기술 부채를 생성하는지 판단한다

### Component 작성 가이드
- component 는 여러 용도를 가진 것이 아니라 한 가지를 아주 잘 하도록 만든다
- highcharts 외에는 styled.component 를 사용한다
- component 지원하는 data structure 와 다른 경우 convert 하여 지원하는 data structure 로 만들어 사용한다