import React from 'react'

interface logoInnerProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface logoProps {
  logo: logoInnerProps
}

const Image = ({ logo }: logoProps) => {
  const { src, width, height, alt } = logo

  const path = src.substring(0, src.lastIndexOf('.'))
  const extension = src.substring(src.lastIndexOf('.') + 1, src.length)

  return (
    <img
      alt={alt}
      src={`${path}.${extension}`}
      srcSet={`${path}.${extension} 1x, ${path}@2x.${extension} 2x`}
      width={width ? `${width}px` : 'auto'}
      height={height ? `${height}px` : 'auto'}
    />
  )
}

export default Image
