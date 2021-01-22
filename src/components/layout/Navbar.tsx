import React from 'react'
import styled from 'styled-components'

import { color } from '../../assets/styles/variables'

const NavbarBox = styled.nav`
  height: 70px;
  background-color: ${color.$white};
  padding: 0 30px;
  display: flex;
  align-items: center;
  margin-bottom: 40px;

  a:active, a:hover {
    text-decoration: none;
  }

  border-bottom: 1px solid ${color.$grey05};
`

interface NavbarProps {
  style: object;
  children: React.ReactNode;
}

const Navbar = ({ style, children }: NavbarProps) => (
  <NavbarBox style={style}>
    { children }
  </NavbarBox>
)

export default Navbar
