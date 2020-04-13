import React from 'react';
import _ from 'lodash'
import styled from 'styled-components';
import PropTypes from 'prop-types'

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

export const ColorSetMap = _.chain(ColorSet)
  .values()
  .reduce((sum, obj) => (_.extend(sum, obj)), {})
  .value()

export const Themes = {
  V1: 'v1',
  ThemeComparePrimarySea: 'theme-compare-primary-sea',
  ThemeCompareSecondaryTeal: 'theme-compare-secondary-teal',
  ThemeArrangePrimarySea: 'theme-arrange-primary-sea',
  ThemeArrangeSecondaryTeal: 'theme-arrange-secondary-teal',
  ThemeArrangeTertiaryRose: 'theme-arrange-tertiary-rose',
  ThemeArrangeQuaternaryGold: 'theme-arrange-quaternary-gold',
  ThemeArrangeQuinaryBerry: 'theme-arrange-quinary-berry',
  ThemeArrangeGradient: 'theme-arrange-gradient',
}

const ThemeMap = {
  [Themes.V1]: {
    blue: ['#d5e7fd', '#a5d2ff', '#63a3f3', '#3788ed', '#2f60c3', '#224b9f', '#1e3476', '#142352'],
    green: ['#ceede7', '#97d9ce', '#24b7a3', '#0c8d84', '#006f75', '#00555a', '#043e4b', '#002340'],
    compare: ['#63a3f3', '#d686c8'],
  },
  [Themes.ThemeComparePrimarySea]: {
    2: ['sea300', 'rose200'],
    '2-1': ['sea300', 'bluegrey80'],
    '2-2': ['sea300', 'bluegrey120'],
    '2-3': ['sea300', 'sea600'],
    3: ['sea300', 'rose200', 'gold100'],
    '3-1': ['sea300', 'bluegrey120', 'sea600'],
    4: ['sea300', 'rose200', 'gold100', 'teal400'],
  },
  [Themes.ThemeCompareSecondaryTeal]: {
    2: ['teal400', 'gold200'],
    '2-1': ['teal400', 'bluegrey80'],
    '2-2': ['teal400', 'bluegrey120'],
    '2-3': ['teal400', 'teal700'],
    3: ['teal400', 'gold200', 'berry300'],
    '3-1': ['teal400', 'bluegrey120', 'teal700'],
    4: ['teal400', 'gold200', 'berry300', 'sea200'],
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
  [Themes.ThemeArrangeGradient]: {
    'Primary-Sea': {
      0: 'sea100',
      50: 'sea300',
      100: 'sea500',
    },
    'Secondary-Teal': {
      0: 'teal200',
      50: 'teal400',
      100: 'teal600',
    },
  },
}

export const getColorsByTheme = (theme, size) => {
  if (['blue', 'green', 'compare'].includes(theme)) {
    return ThemeMap.v1[theme]
  }

  const dataSize = Math.max(2, size)
  const list = ThemeMap[theme || Themes.ThemeArrangePrimarySea][dataSize]

  return _.map(list, (name) => (ColorSetMap[name]))
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

const ChartColorSet = ({ themeName }) => (
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

const ChartColorTheme = ({ themeName }) => (
  <ThemeBox>
    <h3>{themeName}</h3>
    <article>
      {
        _.map(ThemeMap[themeName], (value, key) => (
          <div key={key}>
            <h4>{key}</h4>
            <div>
              {
                _.map(value, (str) => (
                  <dl key={str}>
                    <dt>{str}</dt>
                    <dd>{ColorSetMap[str]}</dd>
                    <dd>
                      <ColorBox size={40} value={ColorSetMap[str] || str} />
                    </dd>
                  </dl>
                ))
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

  const ThemeList = _.values(Themes)

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
