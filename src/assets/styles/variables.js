// Color Set START
export const color = {
  $black: '#000000',
  $primary_white: '#ffffff',
  $primary_navy: '#002d4f',
  $secondary_blue: '#eff8ff',
  $secondary_bg_blue: '#f7fafb',
  $menu_grey: '#565b5f',
  $icn_grey: '#979797',
  $line_btn_grey: '#c4c4c4',
  $line_dashboard_edge_grey: '#d4d4d4',
  $line_search_grey: '#e2e2e2',
  $line_graph_xy_grey: '#e8e8e8',
  $table_grey: '#f2f2f2',
  $bg_grey: '#f8f8f8',
  $table_cell_grey: '#fafafa',
  $legend_timeline_green_01: '#a5e2d7',
  $legend_timeline_green_02: '#27b097',
  $legend_timeline_green_03: '#00745e',
  $legend_timeline_red_01: '#fa6b57',
  $legend_timeline_red_02: '#faafa5',
  // $pathway_link_blue: '#189bff',
  // $pathway_link_red: '#ff3a1f',
  $alert_red: '#ff3c3c',
  $azure: '#189bff',

  $pathway_link_blue: 'rgba(24, 155, 255, 0.4)', // solid_default
  $pathway_link_red: 'rgba(255, 58, 31, 0.4)', // alert_red
  $solid_default: '#189bff',
  $solid_hover: '#0070c6',
  $btn_solid_disable: '#d1e7f7',
  $btn_lightshaded_disable: '#efefef',
  $btn_lightshaded_hover: '#d1d1d1',
  $btn_lightshaded_default: '#e5e5e5',
  $txt_solid_disable: '#ebf6fe',
  $txt_solid_disable_02: '#b7ddf9',
}

export const colorV1 = {
  $pmblue01: '#f7fbff',
  $pmblue02: '#eef7ff',
  $pmblue: '#189bff',
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
}

export const size = {
  $footer_height: '60px',
  $footer_margin_top: '80px',
}

export const zIndex = {
  $modalOverlay: 1000,
  $modal: 1001,
  $modalOverlayLoading: 1002,
}

export const tableProperties = {
  small: {
    thead: {
      size: 13,
      color: colorV1.$grey08,
      bold: true,
      padding: '8px 16px',
      subHeader: { size: 13, color: colorV1.$grey08, bold: true },
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
      subHeader: { size: 13, color: colorV1.$grey08, bold: true },
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
