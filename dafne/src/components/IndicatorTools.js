import React from 'react';
import Switch from "react-switch";
import 'rc-checkbox/assets/index.css';
import Button from 'react-bootstrap/Button';
import Checkbox  from 'rc-checkbox';
import PropTypes from 'prop-types';

import IndicatorModal from '../components/IndicatorModal';
import HelpModal from "../components/HelpModal";

class IndicatorTools extends React.Component {
  constructor() {
    super();
    this.state = {
      checked     : false,
      show_scales : false,
      show_best   : true,
      show_modal  : false,
      sector      : 'All',
      sectors     : []
    };
    this.handleChange    = this.handleChange.bind(this);
    this.handleCbScales  = this.handleCbScales.bind(this);
    this.handleCbValues  = this.handleCbValues.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.onSectorChange  = this.onSectorChange.bind(this);

  }
  componentDidMount(){
    let sectors = this.props.data.indicators.map( i => i.sector).filter((v,i,a) => a.indexOf(v) === i);
    sectors = ["All"].concat(sectors);
    this.setState({
      sectors:sectors
    })
  }
  handleChange(checked) {
    this.setState({ checked });
    let mode = checked ? "absolute" : "normalized";
    this.props.onOptionChanged({
      "option":"mode","value": mode
    });
  }
  handleCbScales(checked) {
    this.setState({ show_scales:checked });
    this.props.onOptionChanged({
      "option":"showScales","value":checked.target.checked
    });
  }
  handleCbValues(checked) {
    this.setState({ show_best:checked });
    this.props.onOptionChanged({
      "option":"showBestWorstValues","value":checked.target.checked
    });
  }
  handleOpenModal(value){
    this.setState({ show_modal : value})
  }
  onSectorChange(e){
    let sector = e.target.value;
    this.setState({sector: sector});
    this.selectedIndicators = this.props.filteredIndicators.slice();
    let indicators = this.props.data.indicators.slice();
    if(sector !== "All"){
      indicators = indicators.filter(i => i.sector !== sector);
    }else{
      indicators = [];
    }
    this.props.onSelectIndicators(indicators);
  }

  renderCommonIndicatorsCheckbox(){
    if(this.props.view === "create"){
      return (null);
    }
    return (
        <label className="it_label" >
          <Checkbox
            defaultChecked
            onChange={(e) => this.props.onCommonIndicatorToggle(e)}
            checked={this.props.showCommonIndicatorsOnly}
          />
          &nbsp;Show common indicators only
        </label>
    )
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
              <div className="it_area_b">
                <div className="circular_button m-b-10" onClick={() => this.handleOpenModal(true)}>+</div>
                add indicator
              </div>
              <div className='it_area_divider'>
              </div>
              <div className="it_area_a">
                <div className="it_row">
                  <label>Sector</label>
                  <select className='custom-select blue-select' onChange={this.onSectorChange} value={this.state.sector}>
                    {
                       this.state.sectors.map(function(s,i) {
                         return <option key={i}
                           value={s}>{s}</option>;
                       })
                    }
                  </select>
                </div>
                <div className="it_row">
                  <label>Region</label>
                  <select className="custom-select blue-select">
                   <option>Basin-wide</option>
                  </select>
                </div>
              </div>
              <div className='it_area_divider'></div>
              <div className="it_area_c">
                <div className="it_row" style={{flexDirection:"column",alignItems: "baseline"}}>
                  <HelpModal type='indicator_tools' />
                </div>
                <div className="it_row" style={{flexDirection:"column",alignItems: "baseline"}}>
                  <label className="it_label" >
                    <Checkbox
                      defaultChecked
                      onChange={this.handleCbScales}
                      disabled={this.state.cb_values}
                    />
                    &nbsp;Show scales
                  </label>
                </div>
                <div className="it_row" style={{flexDirection:"column",alignItems: "baseline"}}>
                  {this.renderCommonIndicatorsCheckbox()}
                </div>
                <div className="it_row" >
                    <div style ={{display: "flex",flex:1,justifyContent:"center",alignItems:"center"}}>
                      <div className="it_label">Satisfaction values&nbsp;</div>
                      <Switch uncheckedIcon={false}
                              onHandleColor={"#1b75bc"}
                              onColor={"#9fc0db"}
                              offHandleColor={"#9fc0db"}
                              handleDiameter={30}
                              height={22}
                              onChange={this.handleChange}
                              checked={this.state.checked}
                      />
                      <div className="it_label" style={{marginRight:30}}>&nbsp;Absolute values</div>
                    </div>
                </div>
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
          onFilterSelected={(filter => {this.props.onFilterSelected(filter)})}
          />
      </div>
    )
  }
}
IndicatorTools.propTypes = {
  data                     : PropTypes.object,
  filteredIndicators       : PropTypes.array,
  onSelectIndicators       : PropTypes.func,
  onOptionChanged          : PropTypes.func,
  view                     : PropTypes.string,
  showCommonIndicatorsOnly : PropTypes.bool,
  onCommonIndicatorToggle  : PropTypes.func,
  onFilterSelected         : PropTypes.func


};


IndicatorTools.defaultProps = {
  data                     : [],
  filteredIndicators       : [],
  onSelectIndicators       : (indicators) => {},
  onOptionChanged          : (option) => {},
  view                     : 'create',
  showCommonIndicatorsOnly : false,
  onCommonIndicatorToggle  : (option) => {},
  onFilterSelected         : (filter) => {},



};
export default IndicatorTools;
