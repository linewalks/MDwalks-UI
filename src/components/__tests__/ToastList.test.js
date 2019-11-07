import React from 'react';
import { shallow, mount } from 'enzyme';

import ToastList  from '@Components/toast/ToastList';
import Toast  from '@Components/toast/Toast';
import ToastCtr  from '@Components/toast/ToastCtr';

describe('ToastList 추가 삭제', () => {
  let wrapper, instance, initKey = 0

  beforeEach(() => {
    wrapper = shallow(<ToastList></ToastList>)
    instance = wrapper.instance()
  })

  it('추가', () => {
    expect(wrapper.find(Toast)).toHaveLength(0)
    instance.addNotification({msg: 'aaa'})
    expect(wrapper.find(Toast)).toHaveLength(1)
    instance.addNotification({msg: 'aaa'})
    expect(wrapper.find(Toast)).toHaveLength(2)
  })

  it('삭제', () => {
    instance.addNotification({msg: 'aaa'})
    expect(wrapper.find(Toast)).toHaveLength(1)
    instance.removeNotification(wrapper.state('list')[0].id)
    expect(wrapper.find(Toast)).toHaveLength(0)
  })
})

describe('append', () => {
  const document = global.document
  const div = document.createElement('div');
  div.id = 'app-root'
  document.body.appendChild(div);

  ToastCtr.add([
    {msg: 'Profile updated successfully!'},
  ])

  expect(document.getElementsByTagName('section')).toHaveLength(1)

  ToastCtr.add([
    {type: 'error', msg: 'Email is already taken.'},
  ])
  expect(document.getElementsByTagName('section')).toHaveLength(2)
})