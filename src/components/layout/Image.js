import React from 'react'

export default ({logo}) => {
  let [path, extension] = logo.src.split('.')
  let {width, height} = logo
  let size = {}
  if (width) size.width = `${width}px`
  if (height) size.height = `${height}px`

  return (
    <img alt={logo.alt}
      src={`${path}.${extension}`} 
      srcSet={`${path}.${extension} 1x, ${path}@2x.${extension} 2x`}
      {...size}
      />
  )
}