import React from 'react'

//button tag이외에 a태그도 받기 위함.
export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
export type Prefer<P, T> = P & Omit<T, keyof P>
export type ElementPropsWithoutRef<T extends React.ReactType> = Pick<
  React.ComponentPropsWithoutRef<T>,
  keyof React.ComponentPropsWithoutRef<T>
>
export type OverwritableType<OwnProps, Type extends React.ReactType> = Prefer<
  OwnProps,
  ElementPropsWithoutRef<Type>
>
interface IProps<T> {
  as: T
}

function ButtonTag<T extends React.ElementType = 'button'>({
  as,
  ...rest
}: OverwritableType<IProps<T>, T>) {
  const ElementType: React.ElementType = as
  console.log(<ElementType {...rest} />)
  return <ElementType {...rest} />
}

ButtonTag.defaultProps = {
  as: 'button',
}

export default ButtonTag

// 아래 예시처럼 href, to 등의 props를 넣어 사용할 수 있다.
// function B() {
//   return (
//     <>

//       {/* Accepts all props of button tag */}
//       <ButtonTag type="submit">Button</ButtonTag>

//       {/* Accepts all props of anchor tag */}
//       <ButtonTag as="a" href="#">
//         Link
//       </ButtonTag>

//       {/* Accepts all props of Link */}
//       <ButtonTag as={Link} to="#">
//         Custom Link
//       </ButtonTag>{' '}

//     </>
//   );
// }
