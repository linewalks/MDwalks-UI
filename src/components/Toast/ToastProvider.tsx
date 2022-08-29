import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import styled from 'styled-components'
import Toast from './Toast'

const ToastContainer = styled.section`
  position: fixed;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
`

interface IToast {
  toastId: string
  type: 'info' | 'warning'
  message: string | React.ReactNode
  duration: number
}

interface IToastCtx {
  addToast: (toast: IToast) => void
  removeToast: (id: string) => void
}

export const ToastContext = createContext<IToastCtx>(null)

export const ToastProvider = ({ children }) => {
  const [toastList, setToastList] = useState([])
  const [isBrowser, setIsBrowser] = useState(false)
  const addToast = useCallback(
    (toast) => setToastList((tl) => tl.concat(toast)),
    [toastList],
  )
  const removeToast = useCallback(
    (id) =>
      setToastList((prevToastList) =>
        prevToastList.filter((toast) => id !== toast.toastId),
      ),
    [],
  )

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {isBrowser &&
        ReactDOM.createPortal(
          <ToastContainer id="toast_root">
            {!_.isEmpty(toastList) &&
              toastList.map(({ toastId, type, message, duration }) => (
                <Toast
                  key={toastId}
                  toastId={toastId}
                  type={type}
                  message={message}
                  duration={duration}
                />
              ))}
          </ToastContainer>,
          document.body,
        )}
      {children}
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const { addToast, removeToast } = useContext(ToastContext)
  return {
    add: addToast,
    remove: removeToast,
  }
}
