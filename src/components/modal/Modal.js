import React, { useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Heading from '@Components/layout/Heading'
import { color, zIndex } from '@src/assets/styles/variables'
import * as font from '@src/assets/styles/font'
import { hexToRGB } from '@Components/button/utility'
import icnPopupCloseMd from '@src/assets/svg/icn_close_32.svg';

const size = {
  modalPadding: '30px',
  borderRadius: '10px',
  maxWidth: '1200px',
  maxHeight: '800px',
  footerMarginTop: '24px',
  footerPaddingTop: '24px',
  minWidth: '480px',
}

const Overlay = styled.div`
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
  background-color: ${color.$primary_white};
  box-shadow: 0px 3px 6px rgba(0,0,0,0.16);
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
})`
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
  margin-top: ${size.footerMarginTop};
  padding-top: ${size.footerPaddingTop};
  border-top: 1px solid ${color.$line_graph_xy_grey};
  text-align: right;

  margin-left: -${size.modalPadding};
  margin-right: -${size.modalPadding};
  padding-left: ${size.modalPadding};
  padding-right: ${size.modalPadding};
`

const Modal = ({
  title, isOpen, isLoading, closeModal, description, footer, children,
}) => {
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
                <Heading size="22" opacity="8">{title}</Heading>
                <div style={{ marginLeft: 'auto', marginTop: '-10px', marginRight: '-10px' }}>
                  <button onClick={closeModal} type="button">
                    <img src={icnPopupCloseMd} width="32x" height="32px" alt="close" />
                  </button>
                </div>
              </div>
              {
                description && (
                  <font.TextTag as="p" size={14} opacity={6} style={{ marginTop: '6px' }}>{description}</font.TextTag>
                )
              }
            </Header>

            <Contents as="article">
              {children}
            </Contents>
            {
              footer && (
                <Footer>
                  <div>
                    {footer}
                  </div>
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
  title: '',
  isOpen: undefined,
  isLoading: undefined,
  closeModal: () => {},
  description: '',
  footer: null,
}

Modal.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  isLoading: PropTypes.bool,
  closeModal: PropTypes.func,
  description: PropTypes.string,
  footer: PropTypes.node,
}

export default Modal
