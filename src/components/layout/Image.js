import React from 'react'
import PropTypes from 'prop-types'

const Image = ({ logo }) => {
  const { src } = logo
  const { width, height } = logo

  const path = src.substring(0, src.lastIndexOf('.'));
  const extension = src.substring(src.lastIndexOf('.') + 1, src.length);

  const size = {}
  if (width) size.width = `${width}px`
  if (height) size.height = `${height}px`

  return (
    <img
      alt={logo.alt}
      src={`${path}.${extension}`}
      srcSet={`${path}.${extension} 1x, ${path}@2x.${extension} 2x`}
      width={logo.width ? `${logo.width}px` : 'auto'}
      height={logo.height ? `${logo.height}px` : 'auto'}
    />
  )
}

Image.propTypes = {
  logo: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  }).isRequired,
}

export default Image
