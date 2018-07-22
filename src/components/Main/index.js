import {h, app} from "hyperapp"
import picostyle from "picostyle"

const style = picostyle(h);

export default style('main')({
  padding: '4em',
  background:'#60D2AC',
  height: '100vh',
  "@media (max-width: 70em)": {
    fontSize: "0.6em",
  }
})