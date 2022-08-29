import React, { useEffect, useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import { useToast } from './ToastProvider'
import { color } from '@Styles/variables'
import icnInfoCircle from '../../assets/svg/toast/icn_done_circle_filled_pmblue_24.svg'
import icnWarningCircle from '../../assets/svg/toast/icn_error_circle_filled_red01_24.svg'
import icnInfoClose from '../../assets/svg/toast/icn_close_pmblue_16.svg'
import icnWarinigClose from '../../assets/svg/toast/icn_close_red01_16.svg'
import fontStyle from '@Styles/font.module.sass'

const animationDuration = 0.2
const getAnimationDelayTime = (duration) => duration / 1000 - animationDuration

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`

interface IToastBox {
  type: 'info' | 'warning'
  duration: number
}

const ToastBox = styled.div<IToastBox>`
  min-width: 440px;
  min-height: 64px;
  margin-bottom: 8px;
  padding: 20px 72px;
  background-color: ${color.$white};
  border: 2px solid
    ${({ type }) => (type === 'info' ? color.$pmblue : color.$red01)};
  border-radius: 8px;
  box-shadow: 0 2px 18px 0 rgba(109, 120, 132, 0.28);
  position: relative;
  animation: ${fadeOut} ${animationDuration}s linear
    ${({ duration }) => getAnimationDelayTime(duration)}s 1 forwards;
`

const ToastInnerBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const CloseBtn = styled.button.attrs({
  type: 'button',
})`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 24px;
`

const Icon = {
  info: {
    circle: icnInfoCircle,
    close: icnInfoClose,
  },
  warning: {
    circle: icnWarningCircle,
    close: icnWarinigClose,
  },
}

interface ToastProps {
  toastId: string
  type: 'info' | 'warning'
  message: string | React.ReactNode
  duration: number
}

const Toast = ({ toastId, type, message, duration }: ToastProps) => {
  const { remove } = useToast()

  const timeoutId = useRef(null)

  console.log(toastId)
  useEffect(() => {
    timeoutId.current = setTimeout(() => {
      remove(toastId)
    }, duration)

    return () => clearTimeout(timeoutId.current)
  }, [duration, remove, toastId])

  return (
    <ToastBox type={type} duration={duration}>
      <ToastInnerBox>
        <div>
          <img
            src={Icon[type].circle}
            width="24"
            height="24"
            alt="circle filled icon"
          />
        </div>
        <div role="alert" className={fontStyle.fs16} style={{ marginLeft: 8 }}>
          {message}
        </div>
        <CloseBtn onClick={() => remove(toastId)}>
          <img src={Icon[type].close} width="16" height="16" alt="close icon" />
        </CloseBtn>
      </ToastInnerBox>
    </ToastBox>
  )
}

Toast.defaultProps = {
  type: 'info',
  duration: 4000,
}

export default React.memo(Toast)
