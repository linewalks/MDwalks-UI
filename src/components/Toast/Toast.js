import React, { useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import PropTypes from 'prop-types'
import { useToast } from './ToastProvider'
import { color } from '../../assets/styles/variables.ts'
import icnInfoCircle from '../../assets/svg/toast/icn_done_circle_filled_pmblue_24.svg'
import icnWarningCircle from '../../assets/svg/toast/icn_error_circle_filled_red01_24.svg'
import icnInfoClose from '../../assets/svg/toast/icn_close_pmblue_16.svg'
import icnWarinigClose from '../../assets/svg/toast/icn_close_red01_16.svg'
import fontStyle from '../../assets/styles/font.module.sass'

const animationDuration = 0.2
const getAnimationDelayTime = (duration) => (duration / 1000) - animationDuration

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`

const ToastBox = styled.div`
  min-width: 440px;
  min-height: 64px;
  padding: 20px 72px;
  background-color: ${color.$white};
  border: 2px solid ${({ type }) => (type === 'info' ? color.$pmblue : color.$red01)};
  border-radius: 8px;
  box-shadow: 0 2px 18px 0 rgba(109, 120, 132, 0.28);
  position: relative;
  animation: ${fadeOut} ${animationDuration}s linear ${({ duration }) => getAnimationDelayTime(duration)}s 1 forwards;
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
  top: 24px;
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

const Toast = ({
  toastId,
  type,
  message,
  duration,
}) => {
  const { remove } = useToast()

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      remove(toastId)
    }, duration)

    return () => clearTimeout(timeoutId)
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
        <div
          role="alert"
          className={fontStyle.fs16}
          style={{ marginLeft: 8 }}
        >
          {message}
        </div>
        <CloseBtn onClick={() => remove(toastId)}>
          <img
            src={Icon[type].close}
            width="16"
            height="16"
            alt="close icon"
          />
        </CloseBtn>
      </ToastInnerBox>
    </ToastBox>
  )
}

Toast.defaultProps = {
  type: 'info',
  duration: 4000,
}

Toast.propTypes = {
  toastId: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['info', 'warning']),
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  duration: PropTypes.number,
}

export default Toast
