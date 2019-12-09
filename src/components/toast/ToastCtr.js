import React from 'react';
import ToastList from '@Components/toast/ToastList'

const ReactDOM = require('react-dom');

function appendReactDOM(Component, dom, done = () => {}) {
  function append() {
    // eslint-disable-next-line react/no-find-dom-node
    dom.appendChild(ReactDOM.findDOMNode(this));
    if (typeof done === 'function') {
      done()
    }
  }

  ReactDOM.render(
    Component,
    document.createElement('div'),
    append,
  );
}

const ToastCtr = ({ data = [] }) => {
  const id = 'app-root'
  const root = document.getElementById(id)

  const a = React.createElement(ToastList, { data }, null)

  appendReactDOM(a, root)
}

ToastCtr.add = (data) => {
  ToastCtr({ data })
}

export default ToastCtr
