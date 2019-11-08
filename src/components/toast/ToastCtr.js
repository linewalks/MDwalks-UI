import React from 'react';
import _ from 'lodash'
import ToastList from '@Components/toast/ToastList'

const ReactDOM = require('react-dom');

function appendReactDOM(Component, dom, props = {}, done = () => {}) {
  ReactDOM.render(
    Component,
    document.createElement('div'),
    function () {
      dom.appendChild(ReactDOM.findDOMNode(this));
      typeof done === 'function' && done();
    }
  );
}

const ToastCtr = ({data = []}) => {
  const id = 'app-root'
  let root = document.getElementById(id)

  const a = React.createElement(ToastList, {data}, null)

  appendReactDOM(a, root, {
    data
  })
}

ToastCtr.add = (data) => {
  ToastCtr({data})
}

export default ToastCtr