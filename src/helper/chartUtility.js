// Sankey Component Util
export const strIdConvert = id => {
  return id.split(' ').join('_')
}

// Table Component Util
export const tableHeaderConvert = header => {
  return header.split('_').map(title => `${title[0].toUpperCase()}${title.slice(1)}`).join(' ')
}