// update ColorSet

interface Color {
  [colorName: string]: string;
}

export const color: Color = {
  $black: '#000000',
  $white: '#ffffff',

  $pmblue01: '#f7fbff',
  $pmblue02: '#eef7ff',
  $pmblue: '#189bff',
  $pmblue_dark: '#028af2',
  $pmnavy: '#132a4a',

  $grey01: '#f8f9fa',
  $grey02: '#f3f6f8',
  $grey03: '#edf1f5',
  $grey04: '#e7ebee',
  $grey05: '#d3d9de',
  $grey06: '#b0b8c1',
  $grey07: '#8b96a3',
  $grey08: '#6d7884',
  $grey09: '#4d5661',
  $grey10: '#303841',

  $red01: '#ff5d46',
  $red02: '#c70901',

  $green01: '#00bf70',
}

interface Size {
  [key: string]: string;
}

export const size: Size = {
  $footer_height: '60px',
  $footer_margin_top: '80px',
}

interface ZIndex {
  [key: string]: number;
}

export const zIndex: ZIndex = {
  $modalOverlay: 1000,
  $modal: 1001,
  $modalOverlayLoading: 1002,
}

interface DefaultTableProp {
  size: number;
  color: string;
  bold?: boolean;
}

interface RestTableProp {
  padding: string;
  subHeader?: DefaultTableProp
}


interface TableProperties {
  [size: string]: {
    [elementType: string]: DefaultTableProp & RestTableProp
  }
}

export const tableProperties: TableProperties = {
  small: {
    thead: {
      size: 13,
      color: color.$grey08,
      bold: true,
      padding: '8px 16px',
      subHeader: { size: 13, color: color.$grey08, bold: true },
    },
    tbody: {
      size: 14,
      color: color.$grey10,
      padding: '8px 16px',
    },
    tfoot: {
      size: 14,
      color: color.$grey10,
      bold: true,
      padding: '12px 16px',
    },
  },
  medium: {
    thead: {
      size: 14,
      color: color.$grey08,
      bold: true,
      padding: '12px 24px',
      subHeader: { size: 13, color: color.$grey08, bold: true },
    },
    tbody: {
      size: 16,
      color: color.$grey10,
      padding: '12px 24px',
    },
    tfoot: {
      size: 16,
      color: color.$grey10,
      bold: true,
      padding: '16px 24px',
    },
  },
}
