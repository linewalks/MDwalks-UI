import React from 'react'
import _ from 'lodash'
import './ProgressBar.sass'
import clsx from 'clsx'
import { color } from '@Styles/variables'

interface ProgressBarProps {
  placement: 'top' | 'right' | 'bottom' | 'left';
  size: 'sm' | 'md';
  state: string | number;
  totalState: string | number;
  width: string | number;
  isNotExistsLabel: boolean;
  customLabel: React.ReactNode | string;
  strokeColor: string;
}

const ProgressBar = ({
  placement, size, state, totalState, width, isNotExistsLabel, customLabel, strokeColor,
}: ProgressBarProps) => {
  const percent = _.isEqual(state, 0) ? 0 : _.floor((_.toInteger(state) / _.toInteger(totalState)) * 100)
  const remainPercent = _.isNaN(percent) ? 100 : 100 - percent

  const label = customLabel || `${state} / ${totalState}`

  console.log(percent, remainPercent, _.isEqual(percent, 0))
  return (
    <section
      className={clsx(['mwc-progressbar', `mwc-progressbar-${placement}`])}
      style={{ minWidth: width }}
    >
      <div
        className={clsx([
          'mwc-progressbar__legendlist',
          `mwc-progressbar__legendlist-${placement}`,
          `mwc-progressbar__legendlist-${size}`,
        ])}
      >
        {!isNotExistsLabel && label}
      </div>
      <div className="mwc-progressbar__state" style={{ width }}>
        <div
          className={clsx([
            'mwc-progressbar__state-current',
            `mwc-progressbar__state-${percent}`,
            (_.isEqual(percent, 100) && `mwc-progressbar__state-full`),
          ])}
          style={{ width: `${percent}%`, backgroundColor: `${color[strokeColor] || strokeColor}` }}
        />
        <div
          className={clsx([
            'mwc-progressbar__state-total',
            `mwc-progressbar__state-${remainPercent}`,
            (_.isEqual(percent, 0) && `mwc-progressbar__state-empty`),
          ])}
          style={{ width: `${remainPercent}%` }}
        />
      </div>
    </section>
  )
}

ProgressBar.defaultProps = {
  placement: 'left',
  size: 'md',
  state: 0,
  totalState: 0,
  width: 100,
  isNotExistsLabel: false,
  customLabel: null,
  strokeColor: null,
}

export default ProgressBar
