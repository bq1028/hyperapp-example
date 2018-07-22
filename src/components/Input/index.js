import {h, app} from "hyperapp"
import picostyle from "picostyle"

const style = picostyle(h)

export default style('input')({
  width: '100%',
  fontSize: '5em',
  color: '#f08',
  background: '#60D2AC',
  border: 'none',
  borderBottom: '0.05em solid #f08',
  outline: 'none',
  textAlign: 'center'
})