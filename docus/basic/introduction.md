---
id: introduction
title: Introduction
---

### MDwalks-UI:two_hearts: 에 대해서
- `MDwalks-UI`는 `Linewalks` 의 테마를 지닌 React 페이지를 보다 쉽고 유용하게 만들기 위해서 탄생했습니다.:boom:
- `Button`, `Table`, `Chart` 등 여러가지 컴포넌트가 존재하고, 해당 컴포넌트는 각자의 기능을 열심히 수행하고 있습니다.

### 왜 정의서를 작성하는거죠:question:
- 우리는 다른 개발자의 코드를 이해하는 항상 많은 시간을 `허비`합니다.
- 우리는 그 과정에 드는 시간을 `줄이고` 싶습니다.
- MDwalks-UI 컴포넌트가 많이지면서 `유지보수`를 위해 다시 코드를 보았을 경우 `특정 함수`가 어떤 기능을 수행하는지, 그리고 왜 이 `styled-component`가 필요한지 이해하는데 너무 많을 시간을 허비할 수 있습니다.
- 정의서는 이러한 시간 아껴줄거에요! 확신합니다! :cat:

### 정의서는 어떻게 작성해야하나요:question:
1. 우선! `MDwalks-UI Project` 에서 `docs/basic/CR_template.md` 를 복사해주세요! :notes:
2. 정의서를 작성하려는 컴포넌트의 경로를 확인해주세요! (예를들어 `Button.tsx`라면 `components/button`이 되겠네요 :cat:)
3. 위 경로를 참고해서 `root` 에 `docus` 폴더에 components 이후 경로에 해당하는 폴더에 파일을 붙여넣어주세요 :exclamation:
4. 붙여넣은 `CR_template.md` 파일의 파일명을 정의서를 작성하려는 컴포넌트의 이름으로 바꿔주세요. (예를들어 `Button` 이었다면, `Button.md` 로 말이죠!)
5. 그리고 내용을 `꽉꽉 채워주세요! (기능, 함수 설명으로요!)`
6. 마지막은 `sidebars` 에 우리가 작성한 파일의 링크를 연결해야합니다. `src/pages/sidebars.js`를 열어주세요.
7. 기존에 존재하는 폴더에 맞는 곳에 문자열로 `경로 + 파일명`을 넣어주세요. (만약 폴더가 없다면, 신규로 추가해주세요!)
8. 이제 끝났습니다. `yarn docstart` 로 열심히 작성한 정의서를 웹에서 확인해봅시다!

### 그 외:exclamation:
- 템플릿을 개선하고 싶나요? 그럼 `언제든` `회의`를 `요청`해주세요!:heartpulse:
- 언제든 MDwalks-UI repo에 issue 를 생성하고 정의서를 추가할 수 있어요!:star: