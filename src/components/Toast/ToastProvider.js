import React, {
  useState, useEffect, createContext, useContext,
} from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import styled from 'styled-components'
import Toast from './Toast'

const ToastContainer = styled.div`
  position: fixed;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
`

export const ToastContext = createContext()

export const ToastProvider = ({ children }) => {
  const [toastList, setToastList] = useState([])
  const [isBrowser, setIsBrowser] = useState(false)
  const addToast = (toast) => setToastList([...toastList, toast])
  const removeToast = (id) => setToastList(
    (prevToastList) => (prevToastList.filter((toast) => id !== toast.toastId)),
  )

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {
        isBrowser && ReactDOM.createPortal(
          <ToastContainer id="toast_root">
            {
              !_.isEmpty(toastList) && toastList.map(({
                toastId, type, message, duration,
              }) => (
                <Toast
                  key={toastId}
                  toastId={toastId}
                  type={type}
                  message={message}
                  duration={duration}
                />
              ))
            }
          </ToastContainer>,
          document.body,
        )
      }
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
