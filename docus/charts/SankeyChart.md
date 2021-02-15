---
id : SankeyChart
title: SankeyChart
description: d3로 구현된 SankeyChart
keywords:
  - SankeyChart
---

### Name
* SankeyChart

### Description
* [d3](https://d3js.org/)와 [d3-sankey-circular](https://github.com/tomshanley/d3-sankey-circular)를 이용하여 구현
* MDwalks-EXI 프로젝트에서 환자의 치료경로를 표현

### Feature
  - [Terminology](#Terminology)
  - [DataFormat](#DataFormat)
  - [Methods](#Methods)

### Structure
  - div

### Feature Details

#### Terminology
![Sankey](/img/sankey.png)

- 노드(node) - 데이터들의 이름을 나타내는 것들을 노드라고 한다.
- 링크(link) - 노드 사이의 연결된 선을 링크라고 한다.

#### DataFormat
```
{
  nodes: [
    {
      name: string;
    },
    ...
  ],
  links: [
    {
      source: string;
      target: string;
      value: number
    },
    ...
  ]
}
```
* nodes - 노드들의 이름을 가진 객체들의 모음
* links - 링크 데이터 객체들의 모음
  * source - 연결하려는 노드의 출발지
  * target - 연결하려는 노드의 목적지
  * value - 노드 사이의 관계를 표현하는 값

#### Methods
* render
  * 데이터가 없으면 renderPlaceholder 메소드를 이용하여, placeholder를 렌더링
  * 데이터가 있으면 div만 렌더링
    * 왜 div한개만 렌더링 할까?
      * d3는 돔을 직접 조작하는 라이브러리이고, react는 가상돔을 이용하는 라이브러리이다. 직접 돔을 조작하기 위해서는 div tag를 렌더 후, componentDidMount에서 차트를 그려야 한다.
    * ref를 사용하는 이유
      * d3로 select를 할 때, id값도 이용가능하지만, react에서는 직접적인 돔조작을 할 때, ref를 사용하도록 권하고 있다.

* componentDidMount
  * resetBtnId props가 있으면, d3를 이용하여 SankeyChart 컴포넌트 외부에 렌더링된 컴포넌트에 resetSankey 메소드를 추가한다.
    * Reset 버튼을 사용하지 않을 수도 있다는 생각에, 외부 컴포넌트에서 reset을 사용하도록 설계하였다.
    * resetSankey - SankeyChart 컴포넌트의 state인 selectedNodes를 기본값으로 초기화 시켜주는 메소드(EXI에서 환자경로를 선택 후, 초기화를 시켜줘야 했기 때문에 만듬)

* renderSankey
  * SankeyChart를 처음 생성된 한 개의 div tag 내부에 렌더링하는 메소드이다.
  * initializeSankey - [d3-sankey-circular 예제](https://bl.ocks.org/tomshanley/b82d9aede85694b1422786ef41536ec5)들을 참고하여 구현하였다. SankeyChart를 그리기위해 필요한것들을 초기화시키는 메소드
  * initializeSVG - d3로 구현된 차트들은 svg로 구현 되어있기 때문에, svg영역을 그려줘야 한다. svg영역을 만드는 메소드이다.
  * initializeGroups - initializeSVG로 생성된 svg 내부에서 렌더되는 모든 노드와 모든 링크를 각각 그룹으로 만들어서 선택하는 메소드이다. renderNodes와 renderLinks에 필요하다.
  * `this.sankey(data)` - [d3-sankey-circular 문서](https://github.com/tomshanley/d3-sankey-circular#_sankey)를 보면, data를 넣으면 노드와 링크가 그려질 위치값이 계산된 데이터들이 생성된다.
  * renderNodes - 노드들을 렌더해주는 메소드
  * renderLinks - 링크들을 렌더해주는 메소드
  * attachEventHandlersToNode - 노드에 이벤트핸들러를 추가해주는 메소드
    * 노드와 노드를 클릭했을 때, linkConnectCheck 함수를 이용하여 노드끼리 링크가 있는지(즉, 연결이 되었는지) 확인 후, 연결되었다면 SankeyChart 컴포넌트의 selectedNodes state를 업데이트 한다.

* highlightLink
  * 노드와 노드를 클릭 시, 링크가 연결되어 있다면 강조해주는 메소드이다.
  * 이것을 파악하기 위해, renderLinks에서 link에 source와 target 관련하여 id를 만들어 주었다.
  * source 노드와 target 노드 방향에 따라 링크의 컬러를 다르게 해주어야 한다. 이것은 위치의 개념을 이용하였다.

* componentDidUpdate
  * 데이터가 변경되면, 차트를 다시 그려주어야 한다. **react는 가상돔을 이용하지만, SankeyChart 컴포넌트는 d3를 대부분 이용하였기 때문에 돔에서 기존 차트를 제거해준 후, 다시 그려주어야 한다.**
  * selctedNodes가 바뀌면 외부에서 주입된 props인 onChange를 동작시켜야 한다. SankeyChart 컴포넌트를 사용하는 부모컴포넌트에서 사용하기 위함이다.
  * 노드를 클릭할 때 마다, highlightLink 계속 실행시킨다. 이유는 변경사항을 클릭 때 마다, 반영하기 위해서이다.
