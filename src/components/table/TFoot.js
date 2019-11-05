import React from 'react';
import isEmpty from 'lodash/isEmpty';
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

const TFoot = ({ headers, footData }) => {
  const createFooter = () => {
    return footData.map((data, idx) =>
      <tr key={`tr${idx}`}>{data.map((d, i) => <td key={`td${i}`}>{d}</td>)}</tr>
    )
  }

  return (
    <React.Fragment>
      {isEmpty(footData) ? null : <TFootTag>{createFooter()}</TFootTag>}
    </React.Fragment>
  )
};

export default TFoot;