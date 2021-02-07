import React from 'react'
import _ from 'lodash'
import './ProgressBar.sass'
import clsx from 'clsx'
import { color } from '../../assets/styles/variables'

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
  const percent = _.floor((_.toInteger(state) / _.toInteger(totalState)) * 100)
  const remainPercent = 100 - percent

  const label = customLabel || `${state} / ${totalState}`

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
          ])}
          style={{ width: `${percent}%`, backgroundColor: `${color[strokeColor] || strokeColor}` }}
        />
        <div
          className={clsx([
            'mwc-progressbar__state-total',
            `mwc-progressbar__state-${remainPercent}`,
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
  totalState: 1,
  width: 100,
  isNotExistsLabel: false,
  customLabel: null,
  strokeColor: null,
}

export default ProgressBar
