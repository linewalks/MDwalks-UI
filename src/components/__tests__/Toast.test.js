import React from 'react'
import {
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import Toast from '@Components/Toast/Toast'
import { ToastContext } from '@Components/Toast/ToastProvider'

let removeSpy

describe('Toast Component', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    const toastEvent = {
      add: jest.fn(),
      remove: jest.fn(),
    }

    removeSpy = jest.spyOn(toastEvent, 'remove')

    render(
      <ToastContext.Provider value={{ addToast: toastEvent.add, removeToast: toastEvent.remove }}>
        <Toast toastId="toast_1" type="info" message="hello" duration={1000} />
      </ToastContext.Provider>,
    )
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('렌더링 된 후 지정된 시간이 지난후 컴포넌트는 사라집니다.', async () => {
    expect(removeSpy).not.toHaveBeenCalled()
    await waitFor(() => screen.getByRole('alert'))

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveTextContent('hello')

    jest.advanceTimersByTime(1000);
    expect(removeSpy).toHaveBeenCalled()
  })
})
