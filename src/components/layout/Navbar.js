import React from 'react'
import styled from 'styled-components'

import { color } from '@src/assets/styles/variables'

const Navbar = styled.nav`
  height: 70px
  background-color: ${color.$primary_white}
  padding: 0 30px
  display: flex
  align-items: center
  margin-bottom: 40px

  a:active, a:hover {
    text-decoration: none
  }
  
  border-bottom: 1px solid ${color.$line_search_grey}
`

export default ({style={}, children}) => {
  return (
    <Navbar style={style}>
      { children }
    </Navbar>
  )
}