import React from 'react';
import "../style/style.scss";
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import IndicatorFilterList from '../components/IndicatorFilterList';
import Data from "../data/data.json";

class IndicatorModal extends React.Component {
  constructor (props) {
    super(props);
    this.handleOpenModal     = this.handleOpenModal.bind(this);
    this.onIndicatorSelected = this.onIndicatorSelected.bind(this);
    this.selectedIndicators  = [];
    this.onOkClick           = this.onOkClick.bind(this);
    this.onSectorChange      = this.onSectorChange.bind(this);
    this.onClearClicked      = this.onClearClicked.bind(this);
    this.selectAll      = this.selectAll.bind(this);
    this.onRegionChange      = this.onRegionChange.bind(this);
    this.filterData          = this.filterData.bind(this);
    this.state               = {
        sector           : 'All',
        region           : 'All',
        sectors          : [],
        regions          : [],
        indicatorsToShow : []
    }

  }
  componentDidMount(){
    let sectors = Data.indicators.map( i => i.sector).filter((v,i,a) => a.indexOf(v) === i);
    sectors = ["All"].concat(sectors);
    let regions = Data.indicators.map( i => i.subbasin).filter((v,i,a) => a.indexOf(v) === i);
    regions = ["All"].concat(regions);
    this.setState({
      sectors:sectors,
      regions:regions,
      indicatorsToShow:this.props.data.indicators
    })
  }
  handleOpenModal(value){
    this.props.handleOpenModal(value);
  }
  onClearClicked(){
    this.selectedIndicators = this.props.data.indicators;
    this.props.onSelectIndicators(this.selectedIndicators);
  }
  onIndicatorSelected(indicator,selected){
    if(!selected){
      this.selectedIndicators = this.props.filteredIndicators.slice();
      this.selectedIndicators.push(indicator);
    }else{
      //remove it
      let t = this.props.filteredIndicators.slice();
      this.selectedIndicators = t.filter( i => i.label !== indicator.label);
    }
    this.props.onSelectIndicators(this.selectedIndicators);
  }
  onOkClick(){
    this.handleOpenModal(false);
  }
  selectAll(){
      this.selectedIndicators = [];
      this.props.onSelectIndicators(this.selectedIndicators);
  }
  filterData(){
      let indicators = Data.indicators.slice();
      let sector = this.state.sector.toLowerCase();
      let region = this.state.region.toLowerCase();
      if(region === "all" && sector === "all"){

      }else if(region !== 'all' && sector === 'all'){
          indicators = indicators.filter(i => {
               return i.subbasin.toString().toLowerCase() === region
          });
      }else if(region === 'all' && sector !== 'all'){
          indicators = indicators.filter(i => {
               return i.sector.toString().toLowerCase() === sector
          });
      }
      else{
          indicators = indicators.filter(i => {
               return i.sector.toString().toLowerCase() === sector || i.subbasin.toString().toLowerCase() === region
          });
      }
      this.setState({
        indicatorsToShow:indicators
      })
  }
  onSectorChange(e){
    let sector = e.target.value;
    this.setState({sector: sector}, () =>{
      this.filterData();
    });
  }
  onRegionChange(e){
    let region = e.target.value;
    this.setState({region: region}, () =>{
        this.filterData();
    });

  }
  render(){
    return (
      <Modal className='custom_modal' show={this.props.show} onHide={() => this.handleOpenModal(false)} centered size="lg">
        <Modal.Header closeButton className="custom_modal_header">
          <Modal.Title> Select your indicators </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='custom_modal_content'>
            <div className='custom_top_content m-b-10'>
              <div>
                <span>Region&nbsp;</span>
                <select className='custom-select blue-select' onChange={this.onRegionChange} value={this.state.region}>
                  {
                     this.state.regions.map(function(s,i) {
                       return <option key={i}
                         value={s}>{s}</option>;
                     })
                  }
                </select>
              </div>

              <div>
                <span>Sector</span>

                <select className='m-l-5 custom-select blue-select ' onChange={this.onSectorChange} value={this.state.sector}>
                  {
                     this.state.sectors.map(function(s,i) {
                       return <option key={i}
                         value={s}>{s}</option>;
                     })
                  }

                </select>
              </div>
              <div style={{display: 'flex',alignItems: 'center'}}>
                  <Button variant="danger" onClick={this.onClearClicked} style={{marginRight:5}}>Clear</Button>
                  <Button variant="info" onClick={this.selectAll}>Select All</Button>
              </div>

            </div>

            <div className='custom_bottom_content p-10'>
              <div className='custom_bottom_content'>
                <IndicatorFilterList
                  indicators={this.state.indicatorsToShow}
                  onClick={(indicator,selected) => this.onIndicatorSelected(indicator,selected)}
                  filteredIndicators={this.props.filteredIndicators}
                  />
                </div>
            </div>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button className='btn_modal' block onClick={() => this.onOkClick()}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
IndicatorModal.propTypes = {
  show                : PropTypes.bool,
  handleOpenModal     : PropTypes.func,
  onClick             : PropTypes.func,
  data                : PropTypes.object,
  filteredIndicators  : PropTypes.array,
  onSelectIndicators  : PropTypes.func

};


IndicatorModal.defaultProps = {
  show               : false,
  handleOpenModal    : () => {},
  onClick            : () => {},
  data               : [],
  filteredIndicators : [],
  onSelectIndicators : (indicators) => {}
};

export default IndicatorModal;
