import React, { useEffect } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Heading from '../layout/Heading'
import Button from '../button/Button'
import { color, zIndex } from '@Styles/variables'
import * as font from '@Styles/font'
import fontStyle from '@Styles/font.module.sass'
import icnPopupCloseMd from '../../assets/svg/icn_close_32.svg'
import { hexToRGB } from '../button/utility'

const size = {
  modalPadding: '30px',
  borderRadius: '8px',
  minWidth: '480px',
  maxWidth: '1200px',
  footerMarginTop: '24px',
  footerPaddingTop: '24px',
}

const Overlay = styled.div<{ isLoading: boolean; }>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: ${hexToRGB(color.$black, 0.6)};
  z-index: ${(props) => (props.isLoading ? zIndex.$modalOverlayLoading : zIndex.$modalOverlay)};
`

const ModalBox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: ${size.minWidth};
  border-radius: ${size.borderRadius};
  background-color: ${color.$white};
  box-shadow: 0 3px 22px 0 rgba(109, 120, 132, 0.24);
  z-index: ${zIndex.$modal};
  padding: ${size.modalPadding};
`

const Header = styled.header`
  > div {
    display: flex;
    align-items: center;
  }

  margin-bottom: 30px;
  button {
    line-height: 1;
  }
`

const Contents = styled(font.TextTag).attrs({
  size: '18',
  bold: false,
  color: color.$grey10,
})`
  padding-bottom: 16px;
`

const Loading = styled.div`
  border: 16px solid #63a3f3; /* Light grey */
  border-top: 16px solid #d5e7fd; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -60px;
  margin-top: -60px;
`

const Footer = styled.footer`
  padding-top: ${size.footerPaddingTop};
  text-align: right;
`

interface basicButtonsProps {
  type: 'alert' | 'confirm';
  closeModal: () => void;
  onCancel: () => void;
  onConfirm: () => void;
}

const basicButtons = ({
  type,
  onCancel,
  onConfirm,
  closeModal,
}: basicButtonsProps) => {
  const wrappedOnCancel = () => {
    onCancel()
    closeModal()
  }
  const wrappedOnConfirm = () => {
    onConfirm()
    closeModal()
  }
  return (
    <div>
      {
        type && _.isEqual(type, 'confirm') && (
          <Button variant="basic_line" size="lg" onClick={wrappedOnCancel}>Cancel</Button>
        )
      }
      <Button variant="primary" size="lg" onClick={wrappedOnConfirm}>Confirm</Button>
    </div>
  )
}

const WrapDescription = styled.p.attrs({
  className: [fontStyle.fs14, fontStyle.fc_grey08].join(' '),
})`
  margin-top: 8px;
`

const FooterBar = styled.div`
  border-top: solid 1px ${color.$grey04};
  margin-left: -30px;
  margin-right: -30px;
`

interface ModalProps {
  variant: 'basic' | 'layer';
  type: 'alert' | 'confirm';
  title: string;
  isOpen: boolean;
  isLoading: boolean;
  description: string;
  children: React.ReactNode;
  footer: React.ReactNode;
  closeModal: () => void;
  onCancel: () => void;
  onConfirm: () => void;
  isExistsScroll: boolean;
}

const Modal = ({
  variant,
  type,
  title,
  isOpen,
  isLoading,
  closeModal,
  description,
  footer,
  children,
  onCancel,
  onConfirm,
  isExistsScroll,
}: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = ''
    }
  }, [isOpen])

  return (
    <>
      {
        isOpen && (
          <Overlay isLoading={isLoading}>
            {
              isLoading && (
                <Loading />
              )
            }
          </Overlay>
        )
      }
      {
        isOpen && (
          <ModalBox>
            <Header>
              <div>
                <Heading size="22">{title}</Heading>
                {
                  _.isEqual(variant, 'layer') && (
                    <div style={{ marginLeft: 'auto', marginTop: '-10px', marginRight: '-10px' }}>
                      <button onClick={closeModal} type="button">
                        <img src={icnPopupCloseMd} width="32px" height="32px" alt="close" />
                      </button>
                    </div>
                  )
                }
              </div>
              {
                description && (
                  <WrapDescription>{description}</WrapDescription>
                )
              }
            </Header>

            <Contents as="article">
              {children}
            </Contents>
            {
              isExistsScroll && (
                <FooterBar />
              )
            }
            {
              footer && (
                <Footer>
                  <div>
                    {footer}
                  </div>
                </Footer>
              )
            }
            {
              _.isEmpty(footer) && _.isEqual(variant, 'basic') && (
                <Footer>
                  {
                    basicButtons({
                      type,
                      onCancel,
                      onConfirm,
                      closeModal,
                    })
                  }
                </Footer>
              )
            }
          </ModalBox>
        )
      }

    </>
  )
}

Modal.defaultProps = {
  variant: 'layer',
  type: 'confirm',
  title: '',
  isOpen: undefined,
  isLoading: undefined,
  closeModal: () => {},
  description: '',
  footer: null,
  onCancel: () => {},
  onConfirm: () => {},
  isExistsScroll: false,
}

Modal.propTypes = {
  variant: PropTypes.oneOf(['basic', 'layer']),
  type: PropTypes.oneOf(['alert', 'confirm']),
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  isLoading: PropTypes.bool,
  closeModal: PropTypes.func,
  description: PropTypes.string,
  footer: PropTypes.node,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  isExistsScroll: PropTypes.bool, // 모달 내부에 스크롤이 존재하는 경우 true
}

export default Modal
