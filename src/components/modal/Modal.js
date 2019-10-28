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
  z-index: ${props => props.isLoading ? zIndex.$modalOverlayLoading : zIndex.$modalOverlay};
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
  z-index: ${zIndex.$modal};

  padding: ${size.modalPadding};
`

const Header = styled.header`
  > div {
    display: flex
    alignItems: baseline;
  }

  margin-bottom: 30px
  button {
    line-height: 1
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

export default (props = {}) => {
  return (
    <React.Fragment>
      {
        props.isOpen && 
        <Overlay isLoading={props.isLoading}>
          { props.isLoading &&
            <Loading></Loading>
          }
        </Overlay>
      }
      {
        props.isOpen &&
        <Modal>
          {
            <Header>
              <div>
                <Heading size="22" opacity="8">{props.title}</Heading>
                <div style={{marginLeft: 'auto', marginTop: '-10px', marginRight: '-10px'}}>
                  <button onClick={props.closeModal}>
                    <img src={icn_popup_close_md} width="34x" height="34px" />
                  </button>
                </div>
              </div>
              {
                props.description &&
                <font.TextTag as="p" size={14} opacity={6} style={{marginTop: '6px'}}>{props.description}</font.TextTag>
              }
            </Header>
          }

          <Contents as="article">
            {props.children}
          </Contents>
          
          {
            props.footer &&
            <Footer>
              <div>
                {props.footer}
              </div>
            </Footer>
          }
        </Modal>
      }

    </React.Fragment>
  )
}