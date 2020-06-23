/* eslint-disable import/prefer-default-export */
import { colorV1 } from '@src/assets/styles/variables'

export const tableSize = {
  small: {
    thead: {
      size: 13,
      color: colorV1.$grey08,
      bold: true,
      padding: '8px 16px',
      subHeader: {
        size: 13, color: colorV1.$grey08, bold: true, padding: '6px 16px',
      },
    },
    tbody: {
      size: 14,
      color: colorV1.$grey10,
      padding: '8px 16px',
    },
    tfoot: {
      size: 14,
      color: colorV1.$grey10,
      bold: true,
      padding: '12px 16px',
    },
  },
  medium: {
    thead: {
      size: 14,
      color: colorV1.$grey08,
      bold: true,
      padding: '12px 24px',
      subHeader: {
        size: 13, color: colorV1.$grey08, bold: true, padding: '6px 24px',
      },
    },
    tbody: {
      size: 16,
      color: colorV1.$grey10,
      padding: '12px 24px',
    },
    tfoot: {
      size: 16,
      color: colorV1.$grey10,
      bold: true,
      padding: '16px 24px',
    },
  },
}
