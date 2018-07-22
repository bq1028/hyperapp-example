import {h, app} from "hyperapp"
import picostyle from 'picostyle'

const style = picostyle(h);

export default style('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: '50em',
  marginLeft: 'auto',
  marginRight: 'auto',
})