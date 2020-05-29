import PropTypes from 'prop-types'

const Layout = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
}

Layout.propTypes = PropTypes.oneOf([Layout.HORIZONTAL, Layout.VERTICAL])

export default {
  Layout,
}
