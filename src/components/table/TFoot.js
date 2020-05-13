import React from 'react';
import PropTypes from 'prop-types'
import _ from 'lodash';
import styled from 'styled-components'
import * as variables from '@src/assets/styles/variables'

const TFootTag = styled.tfoot`
  td {
    background-color: ${variables.color.$table_grey};
    padding: 24px;

    text-align: center;
    font-size: 18px;
    font-family: "Spoqa Han Sans";
  }

  border-top: 2px solid ${variables.color.$line_dashboard_edge_grey};
`

const TFoot = ({ footData }) => {
  const createFooter = () => (
    _.map(footData, (data, i) => {
      const trKey = `footer${data.join(' ')}${i}`
      return (
        <tr key={trKey}>
          {
            _.map(data, (row, j) => {
              let colSpan
              const text = _.isObject(row) ? row.text : row
              const tdKey = `footeritem${text}${j}`

              if (row.colSpan) {
                colSpan = row.colSpan
              }

              return (
                <td key={tdKey} colSpan={colSpan}>{text}</td>
              )
            })
          }
        </tr>
      )
    })
  )

  return (
    <>
      {_.isEmpty(footData) ? null : <TFootTag>{createFooter()}</TFootTag>}
    </>
  )
};

TFoot.defaultProps = {
  footData: undefined,
}

TFoot.propTypes = {
  footData: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape(),
      ]),
    ),
  ),
}

export default TFoot
