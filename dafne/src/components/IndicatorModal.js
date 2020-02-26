import React from 'react';
import "../style/style.scss";
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import IndicatorFilterList from '../components/IndicatorFilterList';
import Data from "../data/data.json";

class IndicatorModal extends React.Component {
  constructor (props) {
    super(props);
    this.handleOpenModal      = this.handleOpenModal.bind(this);
    this.onIndicatorSelected  = this.onIndicatorSelected.bind(this);
    this.selectedIndicators   = [];
    this.onOkClick            = this.onOkClick.bind(this);
    this.onSectorChange       = this.onSectorChange.bind(this);
    this.onClearClicked       = this.onClearClicked.bind(this);
    this.state = {
      sector:'All',
      sectors:[]
    }

  }
  componentDidMount(){
    let sectors = Data.indicators.map( i => i.sector).filter((v,i,a) => a.indexOf(v) === i);
    sectors = ["All"].concat(sectors);
    this.setState({
      sectors:sectors
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
    // let fIndicators = [];
    // let indicators = this.props.data.indicators;
    // let selectedIndicatorsLabels = this.selectedIndicators.map(i => i.label);
    // for (var i = 0; i < indicators.length; i++) {
    //   if(!selectedIndicatorsLabels.includes(indicators[i].label)){
    //     fIndicators.push(indicators[i]);
    //   }
    // }
    // this.props.onSelectIndicators(fIndicators);
  }
  onSectorChange(e){
    let sector = e.target.value;
    this.setState({sector: sector});
    this.selectedIndicators = this.props.filteredIndicators.slice();
    let indicators = Data.indicators.slice();
    if(sector !== "All"){
      indicators = indicators.filter(i => i.sector !== sector);
    }else{
      indicators = [];
    }
    this.props.onSelectIndicators(indicators);


    // this.props.onFilterSelected(e.target.value);
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
              <span>Filters: </span>

              <div>
                <span>Region&nbsp;</span>
                <select className='m-l-5 custom-select blue-select'>
                  <option>basin-wide</option>
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
              <Button variant="danger" onClick={this.onClearClicked}>Clear</Button>
            </div>

            <div className='custom_bottom_content p-10'>
              <div className='custom_bottom_content'>
                <IndicatorFilterList
                  indicators={this.props.data.indicators}
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
