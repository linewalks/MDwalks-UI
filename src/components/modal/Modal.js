import React, { useState, Component } from 'react';
import styled from 'styled-components'

import Heading from '../layout/Heading'
import { color, zIndex } from '../../assets/styles/variables'
import * as font from '../../assets/styles/font'
import { hexToRGB } from '../button/utility'
import icn_popup_close_md from '../../assets/svg/icn_popup_close_md.svg';

const size = {
  modalPadding: '30px',
  borderRadius: '10px',
  maxWidth: '1200px',
  maxHeight: '800px',
  footerMarginTop: '40px',
  minWidth: '480px',
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: ${hexToRGB(color.$black, 0.6)};
  z-index: ${zIndex.$modalOverlay};
`

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: ${size.minWidth};
  border-radius: ${size.borderRadius};
  background-color: ${color.$primary_white};
  box-shadow: 0px 3px 6px rgba(0,0,0,0.16);
  z-index: ${zIndex.$modal}

  padding: ${size.modalPadding}
`

const Header = styled.header`
  display: flex
  alignItems: baseline;
  margin-bottom: 30px
  button {
    line-height: 1
  }
`

const Contents = styled(font.TextTag).attrs({
  size: '18',
  bold: false,
})``

const Footer = styled.footer`
  margin-top: ${size.footerMarginTop};
  text-align: right;
`

export default (props = {}) => {
  return (
    <React.Fragment>
      {
        props.isOpen && 
        <Overlay />
      }
      {
        props.isOpen &&
        <Modal>
          {
            props.title &&
            <Header>
              <Heading>{props.title}</Heading>
              <div style={{marginLeft: 'auto', marginTop: '-10px', marginRight: '-10px'}}>
                <button onClick={props.closeModal}>
                  <img src={icn_popup_close_md} width="34x" height="34px" />
                </button>
              </div>
            </Header>
          }

          <Contents as="article">
            {props.children}
          </Contents>
          
          {
            props.footer &&
            <Footer>
              {props.footer}
            </Footer>
          }
        </Modal>
      }

    </React.Fragment>
  )
}