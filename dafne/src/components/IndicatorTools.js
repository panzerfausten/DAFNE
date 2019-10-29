import React from 'react';
import Switch from "react-switch";
import 'rc-checkbox/assets/index.css';
import Button from 'react-bootstrap/Button';
import Checkbox  from 'rc-checkbox';
import PropTypes from 'prop-types';

import IndicatorModal from '../components/IndicatorModal';

class IndicatorTools extends React.Component {
  constructor() {
    super();
    this.state = {
      checked     : false,
      show_scales : false,
      show_best   : true,
      show_modal  : false,
    };
    this.handleChange    = this.handleChange.bind(this);
    this.handleCbScales  = this.handleCbScales.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
  }
  handleCbScales(checked) {
    this.setState({ show_scales:checked });
  }
  handleOpenModal(value){
    this.setState({ show_modal : value})
  }
  render(){
    return(
      <div className="" >
        <div className="widget_title">
          Solution Pathways
        </div>
        <div className="filter">
          <div className="filter_title">
            Indicator Tools
          </div>
          <div className="filter_content">
          <div className="it_area">
            <div className="it_area_a">
                <div className="it_row">
                  <div className="it_label" style={{width:180}}>Your indicator sets:</div>
                  <div><select style={{width:290}}></select></div>
                  <Button size="sm" onClick={() => {}} style={{width: 200}}>Upload a new set</Button>
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
            <div className='it_area_divider'></div>
            <div className="it_area_b">
              <div className="circular_button m-b-10" onClick={() => this.handleOpenModal(true)}>+</div>
              add indicator
            </div>
          </div>
          </div>
        </div>
        <IndicatorModal
          show={this.state.show_modal}
          handleOpenModal={this.handleOpenModal}
          data={this.props.data}
          filteredIndicators={this.props.filteredIndicators}
          onSelectIndicators={(indicators) => {this.props.onSelectIndicators(indicators);}}
          />
      </div>
    )
  }
}
IndicatorTools.propTypes = {
  data                : PropTypes.object,
  filteredIndicators  : PropTypes.array,
  onSelectIndicators  : PropTypes.func,

};


IndicatorTools.defaultProps = {
  data               : [],
  filteredIndicators : [],
  onSelectIndicators : (indicators) => {},

};
export default IndicatorTools;
