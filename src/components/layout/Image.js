import React from 'react'

export default ({logo}) => {
  let [path, extension] = logo.src.split('.')

  return (
    <img alt={logo.alt}
      src={`${path}${extension}`} 
      srcSet={`${path}.${extension} 1x, ${path}@2x.${extension} 2x`}
      />
  )
}