import React from 'react';
import Switch from "react-switch";
import 'rc-checkbox/assets/index.css';
import Button from 'react-bootstrap/Button';
import Checkbox  from 'rc-checkbox';
class IndicatorTools extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      show_scales : false,
      show_best : true
    };
    this.handleChange   = this.handleChange.bind(this);
    this.handleCbScales = this.handleCbScales.bind(this);

  }
  handleChange(checked) {
    this.setState({ checked });
  }
  handleCbScales(checked) {
    this.setState({ show_scales:checked });
  }
  render(){
    return(
      <div className="it_widget" >
        <div className="widget_title gray">Indicator Tools</div>
        <div className="it_area">
          <div className="it_area_a">
              <div className="it_row">
                <div className="it_label" style={{width:180}}>Your indicator sets:</div>
                <div><select style={{width:180}}></select></div>
                <Button size="sm" onClick={() => {}}>Upload a new set</Button>
              </div>
              <div className="it_row" >
                <div className="it_label" style={{width:180}}>Values of the <br></br> Indicators:</div>
                  <div style ={{display: "flex",justifyContent: "inherit",width: "280px",}}>
                    <div className="it_label">Satisfaction<br></br> Values</div>
                    <Switch uncheckedIcon={false}
                            onHandleColor={"#1b75bc"}
                            onColor={"#9fc0db"}
                            offHandleColor={"#9fc0db"}
                            handleDiameter={30}
                            height={22}
                            onChange={this.handleChange}
                            checked={this.state.checked}
                    />
                    <div className="it_label" style={{marginRight:30}}>Absolute<br></br> Values</div>
                  </div>
                  <div className="it_row" style={{flexDirection:"column",alignItems: "baseline"}}>
                    <label className="it_label" >
                      <Checkbox
                        defaultChecked
                        onChange={this.handleCbScales}
                        disabled={this.state.cb_values}
                      />
                      Show scales
                    </label>
                    <label className="it_label">
                      <Checkbox
                        defaultChecked
                        onChange={this.handleCbScales}
                        disabled={this.state.cb_values}
                      />
                      Show best / worst values
                    </label>
                  </div>
              </div>
          </div>
          <div className="it_area_b" style={{marginLeft: "50",display: "flex",justifyContent: "center",alignItems: "center"}}>
          <div className="circular_button">+</div>
          </div>
        </div>
      </div>
    )
  }
}
export default IndicatorTools;
