import React from 'react';
import _ from 'lodash'
import styled from 'styled-components';
import PropTypes from 'prop-types'
import { color } from '@src/assets/styles/variables'

export const ColorSet = {
  'Primary-Sea': {
    sea50: '#c0d7fc',
    sea100: '#92b9fc',
    sea200: '#5892fc',
    sea300: '#2c6ff5',
    sea400: '#1952cf',
    sea500: '#0f3ca6',
    sea600: '#0e2769',
    sea700: '#091840',
  },
  'Secondary-Teal': {
    teal100: '#ade0da',
    teal200: '#84d1c8',
    teal300: '#5cbfb4',
    teal400: '#3bada0',
    teal500: '#1f948a',
    teal600: '#06706d',
    teal700: '#004545',
    teal800: '#012b2b',
  },
  'Tertiary-Rose': {
    rose50: '#fac8c3',
    rose100: '#ff9e91',
    rose200: '#fc6c5c',
    rose300: '#e34b3d',
    rose400: '#ba2f33',
    rose500: '#922228',
    rose600: '#661216',
    rose700: '#3d080b',
  },
  'Quaternary-Gold': {
    gold50: '#fae0c3',
    gold100: '#fccc90',
    gold200: '#ffb157',
    gold300: '#f7a223',
    gold400: '#d9840d',
    gold500: '#ad6507',
    gold600: '#69400f',
    gold700: '#3d2408',
  },
  'Quinary-Berry': {
    berry50: '#f5c9e0',
    berry100: '#eda1cb',
    berry200: '#e374b1',
    berry300: '#cf5194',
    berry400: '#b03775',
    berry500: '#8c2659',
    berry600: '#61133a',
    berry700: '#3d0923',
  },
  'Total-Bluegrey': {
    bluegrey50: '#d8dde8',
    bluegrey80: '#c7cdd9',
    bluegrey120: '#bac0cc',
    bluegrey170: '#aab0bd',
    bluegrey230: '#9aa1ad',
    bluegrey300: '#888e99',
  },
  'Chart-Hover': {
    'red-hover': 'rgba(255, 41, 10, 0.08)',
    'grey-hover': 'rgba(48, 56, 65, 0.06)',
    'highlight-hover': 'rgba(255, 240, 0, 0.14)',
  },
}

export const toCamel = (s) => (
  s
    .replace(/([-_][a-z])/ig, ($1) => (
      $1.toUpperCase()
        .replace('-', '')
        .replace('_', '')
    ))
    .replace(/^[a-z]{1}/ig, ($1) => (
      $1.toUpperCase()
    ))
)

export const ColorSetMap = _.chain(ColorSet)
  .values()
  .reduce((sum, obj) => (_.extend(sum, obj)), {})
  .value()

export const Themes = {
  V1: 'v1',
  ThemeComparePrimarySea: 'theme-compare-primary-sea',
  ThemeComparePrimarySea1: 'theme-compare-primary-sea1',
  ThemeComparePrimarySea2: 'theme-compare-primary-sea2',
  ThemeComparePrimarySea3: 'theme-compare-primary-sea3',
  ThemeCompareSecondaryTeal: 'theme-compare-secondary-teal',
  ThemeCompareSecondaryTeal1: 'theme-compare-secondary-teal1',
  ThemeCompareSecondaryTeal2: 'theme-compare-secondary-teal2',
  ThemeCompareSecondaryTeal3: 'theme-compare-secondary-teal3',
  ThemeArrangePrimarySea: 'theme-arrange-primary-sea',
  ThemeArrangeSecondaryTeal: 'theme-arrange-secondary-teal',
  ThemeArrangeTertiaryRose: 'theme-arrange-tertiary-rose',
  ThemeArrangeQuaternaryGold: 'theme-arrange-quaternary-gold',
  ThemeArrangeQuinaryBerry: 'theme-arrange-quinary-berry',
  ThemeArrangeGradientPrimarySea: 'theme-arrange-gradient-primary-sea',
  ThemeArrangeGradientSecondaryTeal: 'theme-arrange-gradient-secondary-teal',
  ThemeBubble: 'theme-bubble',
}

const ThemeMap = {
  [Themes.V1]: {
    blue: ['#d5e7fd', '#a5d2ff', '#63a3f3', '#3788ed', '#2f60c3', '#224b9f', '#1e3476', '#142352'],
    green: ['#ceede7', '#97d9ce', '#24b7a3', '#0c8d84', '#006f75', '#00555a', '#043e4b', '#002340'],
    compare: ['#63a3f3', '#d686c8'],
  },
  [Themes.ThemeComparePrimarySea]: {
    2: ['sea300', 'rose200'],
    3: ['sea300', 'rose200', 'gold100'],
    4: ['sea300', 'rose200', 'gold100', 'teal400'],
    11: ['sea100', 'sea300', 'sea500', 'rose100', 'rose200', 'gold100', 'gold200', 'teal200', 'teal400', 'berry100', 'berry300'],
  },
  [Themes.ThemeComparePrimarySea1]: {
    2: ['sea300', 'bluegrey80'],
  },
  [Themes.ThemeComparePrimarySea2]: {
    2: ['sea300', 'bluegrey120'],
    3: ['sea300', 'bluegrey120', 'sea600'],
  },
  [Themes.ThemeComparePrimarySea3]: {
    2: ['sea300', 'sea600'],
  },
  [Themes.ThemeCompareSecondaryTeal]: {
    2: ['teal400', 'gold200'],
    3: ['teal400', 'gold200', 'berry300'],
    4: ['teal400', 'gold200', 'berry300', 'sea200'],
  },
  [Themes.ThemeCompareSecondaryTeal1]: {
    2: ['teal400', 'bluegrey80'],
  },
  [Themes.ThemeCompareSecondaryTeal2]: {
    2: ['teal400', 'bluegrey120'],
    3: ['teal400', 'bluegrey120', 'teal700'],
  },
  [Themes.ThemeCompareSecondaryTeal3]: {
    2: ['teal400', 'teal700'],
  },
  [Themes.ThemeArrangePrimarySea]: {
    2: ['sea300', 'sea500'],
    3: ['sea100', 'sea300', 'sea500'],
    4: ['sea100', 'sea300', 'sea500', 'sea600'],
    5: ['sea50', 'sea100', 'sea300', 'sea500', 'sea600'],
    6: ['sea50', 'sea100', 'sea300', 'sea500', 'sea600', 'sea700'],
  },
  [Themes.ThemeArrangeSecondaryTeal]: {
    2: ['teal400', 'teal600'],
    3: ['teal200', 'teal400', 'teal600'],
    4: ['teal200', 'teal400', 'teal600', 'teal700'],
    5: ['teal100', 'teal200', 'teal400', 'teal600', 'teal700'],
    6: ['teal100', 'teal200', 'teal400', 'teal600', 'teal700', 'teal800'],
  },
  [Themes.ThemeArrangeTertiaryRose]: {
    2: ['rose200', 'rose400'],
    3: ['rose100', 'rose200', 'rose400'],
    4: ['rose100', 'rose200', 'rose400', 'rose600'],
    5: ['rose50', 'rose100', 'rose200', 'rose400', 'rose600'],
    6: ['rose50', 'rose100', 'rose200', 'rose400', 'rose600', 'rose700'],
  },
  [Themes.ThemeArrangeQuaternaryGold]: {
    2: ['gold200', 'gold400'],
    3: ['gold100', 'gold200', 'gold400'],
    4: ['gold100', 'gold200', 'gold400', 'gold600'],
    5: ['gold50', 'gold100', 'gold200', 'gold400', 'gold600'],
    6: ['gold50', 'gold100', 'gold200', 'gold400', 'gold600', 'gold700'],
  },
  [Themes.ThemeArrangeQuinaryBerry]: {
    2: ['berry200', 'berry400'],
    3: ['berry100', 'berry200', 'berry400'],
    4: ['berry100', 'berry200', 'berry400', 'berry600'],
    5: ['berry50', 'berry100', 'berry200', 'berry400', 'berry600'],
    6: ['berry50', 'berry100', 'berry200', 'berry400', 'berry600', 'berry700'],
  },
  [Themes.ThemeArrangeGradientPrimarySea]: {
    0: 'sea100',
    50: 'sea300',
    100: 'sea500',
  },
  [Themes.ThemeArrangeGradientSecondaryTeal]: {
    0: 'teal200',
    50: 'teal400',
    100: 'teal600',
  },
}

const isV1 = (theme) => (['blue', 'green', 'compare', 'v1'].includes(theme))
const isArrange = (theme) => (_.includes(theme, 'arrange') && !_.includes(theme, 'gradient'))
const isCompare = (theme) => (_.includes(theme, 'compare'))
const isGradient = (theme) => (_.includes(theme, 'gradient') && _.includes(theme, 'arrange'))
const isBubble = (theme) => (_.includes(theme, 'bubble'))

const getColorsOfBubble = () => {
  let list = [
    ...ThemeMap[Themes.ThemeArrangePrimarySea]['5'].reverse(),
    ...ThemeMap[Themes.ThemeArrangeSecondaryTeal]['5'].reverse(),
    ...ThemeMap[Themes.ThemeArrangeTertiaryRose]['5'].reverse(),
    ...ThemeMap[Themes.ThemeArrangeQuaternaryGold]['5'].reverse(),
  ]

  list = _.map(list, (name) => (ColorSetMap[name]))

  return _
    .extend(
      _.fromPairs(_.zip('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.slice(0, list.length).split(''), list)),
      {
        START_CIRCLE: ColorSet['Primary-Sea'].sea700,
        END_CIRCLE: color.$red01,
      },
    )
}

/*
  dataSize 보다 작은 Theme.key 의 value 를 반복해서 사용한다
  dataSize 보다 작은 Theme 의 key 가 없다면
    -> dataSize 는 Theme 의 key 중 min 값으로 설정한다
 */
export const getListWhenNotMatch = (ThemeObj, dataSize) => {
  const themeKeys = _.map(_.keys(ThemeObj), _.toNumber)

  let list = []
  if (dataSize < _.min(themeKeys)) {
    list = ThemeObj[_.min(themeKeys)]
  } else {
    const validSize = _.chain(themeKeys).filter((num) => num < dataSize).max().value()

    let count;
    if (dataSize % validSize === 0) {
      count = dataSize / validSize
    } else {
      count = parseInt(dataSize / validSize, 10) + 1
    }

    list = _.chain(_.range(0, count))
      .map(() => (ThemeObj[validSize]))
      .flattenDeep()
      .value()
  }

  return list
}

export const getColorsByTheme = (theme, size) => {
  if (isBubble(theme)) {
    return getColorsOfBubble()
  }

  if (isV1(theme)) {
    return ThemeMap.v1[theme]
  }

  const themeName = _.isUndefined(theme) ? Themes.ThemeArrangePrimarySea : theme

  let list = []

  const dataSize = Math.max(2, size || 0)

  if (isArrange(themeName) || isCompare(themeName)) {
    const ThemeObj = ThemeMap[themeName]

    if (ThemeObj[dataSize]) {
      list = ThemeObj[dataSize]
    } else { // 매칭 되는게 없다
      list = getListWhenNotMatch(ThemeObj, dataSize)
    }
  } else if (isGradient(themeName)) {
    list = ThemeMap[themeName]
  }

  list = _.map(list, (name) => (ColorSetMap[name]))

  // Arrange 시 지원 개수 초과시 반복
  // compare 시 지원 개수 초과시 에러
  return list
}

const Box = styled.div`
  dl {
    text-align: center;
    display: inline-block;
    padding: 5px;
  }

  &:not(:last-child) {
    margin-bottom: 20px;
  }
`

const ThemeBox = styled.div`
  dl {
    position: relative;
    padding-left: calc(40px + 5px);
    min-height: 40px;
  }
  dd:last-child {
    position: absolute;
    left: 0; top: 0;
  }

  > article {
    display: grid;
    grid-template-rows: repeat(1, 350px);
    grid-template-columns: repeat(8, 1fr);
  }
`

const ColorBox = styled.section`
  display: inline-block;
  width: ${(props) => (props.size ? `${props.size}px` : '100px')};
  height: ${(props) => (props.size ? `${props.size}px` : '100px')};
  background-color: ${(props) => (props.value)}
`

export const ChartColorSet = ({ themeName }) => (
  <Box>
    <h3>{themeName}</h3>
    {
      _.map(ColorSet[themeName], (value, key) => (
        <dl key={key}>
          <dt>{key}</dt>
          <dd>{value}</dd>
          <dd>
            <ColorBox value={value} />
          </dd>
        </dl>
      ))
    }
  </Box>
)

ChartColorSet.defaultProps = {
}

ChartColorSet.propTypes = {
  themeName: PropTypes.string.isRequired,
}

export const ChartColorTheme = ({ themeName }) => (
  <ThemeBox>
    <h3>{themeName}</h3>
    <p>
      <strong>Use : </strong>
      {`Themes.${toCamel(themeName)}`}
    </p>
    <article>
      {
        _.map(ThemeMap[themeName], (value, key) => (
          <div key={key}>
            <h4>{key}</h4>
            <div>
              {
                (isV1(themeName) || isArrange(themeName) || isCompare(themeName))
                && _.map(value, (str) => (
                  <dl key={str}>
                    <dt>{str}</dt>
                    <dd>{ColorSetMap[str]}</dd>
                    <dd>
                      <ColorBox size={40} value={ColorSetMap[str] || str} />
                    </dd>
                  </dl>
                ))
              }
              {
                (isGradient(themeName)) && ( // is Gradient
                  <dl>
                    <dt>{key}</dt>
                    <dd>{value}</dd>
                    <dd>
                      <ColorBox size={40} value={ColorSetMap[value]} />
                    </dd>
                  </dl>
                )
              }
            </div>
          </div>
        ))
      }
    </article>
  </ThemeBox>
)

ChartColorTheme.defaultProps = {
}

ChartColorTheme.propTypes = {
  themeName: PropTypes.string.isRequired,
}

const ChartColor = () => {
  const ColorList = [
    'Primary-Sea', 'Secondary-Teal', 'Tertiary-Rose', 'Quaternary-Gold', 'Quinary-Berry',
    'Total-Bluegrey', 'Chart-Hover',
  ]

  const ThemeList = _.without(_.values(Themes), Themes.ThemeBubble)

  return (
    <>
      {
        _.map(ColorList, (themeName) => (<ChartColorSet key={themeName} themeName={themeName} />))
      }
      {
        _.map(ThemeList, (themeName) => (<ChartColorTheme key={themeName} themeName={themeName} />))
      }
    </>
  )
}

export default ChartColor
