/* eslint-disable import/extensions */
import BarGauge from './components/charts/BarGauge'
import RadiusGauge from './components/charts/RadiusGauge'
import SankeyChart from './components/charts/SankeyChart'
import SelectedCard from './components/card/SelectedCard'
import SummaryCard from './components/card/SummaryCard'
import Table from './components/table/Table'
import Descriptions from './components/table/Descriptions'
import EmptyPlaceHolder from './components/table/EmptyPlaceHolder'
import BarChart from './components/charts/BarChart'
import BarChartMulti from './components/charts/BarChartMulti'
import LineChart from './components/charts/LineChart'
import Timeline from './components/charts/Timeline'
import LineMergeTimeline from './components/charts/LineMergeTimeline'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Image from './components/layout/Image'
import Heading from './components/layout/Heading'
import Tabs from './components/layout/Tabs'
import Histogram from './components/charts/Histogram'
import Modal from './components/modal/Modal'
import CheckBox from './components/list/CheckBox'
import CheckList from './components/list/CheckList'
import RadioList from './components/list/RadioList'
import RadarChart from './components/charts/RadarChart'
import TreeMap from './components/charts/TreeMap'
import TimeToEvent from './components/charts/TimeToEvent'
import PieChart from './components/charts/PieChart'
import Button from './components/button/Button'
import ButtonLink from './components/button/ButtonLink'
import ButtonTextLink from './components/button/ButtonTextLink'
import TextLink from './components/button/TextLink'
import * as Toast from './components/Toast'
import Pagination from './components/pagination/Pagination'
import ToggleButton from './components/button/ToggleButton'
import TooltipBox from './components/tooltip/TooltipBox'
import * as commonTag from './components/common/commonTag'

import SelectBox from './components/form/SelectBox'
import Tooltip from './components/form/Tooltip'
import * as font from './assets/styles/font'
import * as variables from './assets/styles/variables'
import * as tableProperties from './assets/styles/tableProperties'
import * as chartUtility from './helper/chartUtility'

import * as DateUtility from './helper/DateUtility'

// import notifications from '@Components/notifications'
import * as ChartColor from './components/ChartColor'

import ProgressBar from './components/progressbar/ProgressBar'

import { version } from '../package.json'

export {
  version,
  BarGauge,
  RadiusGauge,
  SankeyChart,
  SelectedCard,
  SummaryCard,
  Table,
  EmptyPlaceHolder,
  Descriptions,
  BarChart,
  BarChartMulti,
  LineChart,
  Timeline,
  LineMergeTimeline,
  Navbar,
  Footer,
  Image,
  Heading,
  Tabs,
  Modal,
  CheckBox,
  CheckList,
  RadioList,
  font,
  variables,
  tableProperties,
  chartUtility,
  Button,
  ButtonLink,
  ButtonTextLink,
  TextLink,
  ToggleButton,
  Toast,
  TooltipBox,
  commonTag,
  Histogram,
  RadarChart,
  SelectBox,
  Tooltip,
  TreeMap,
  TimeToEvent,
  PieChart,
  Pagination,
  DateUtility,
  // notifications,
  ChartColor,
  ProgressBar,
}
