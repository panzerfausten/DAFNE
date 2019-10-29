import React from 'react';
import "../style/style.scss";
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import IndicatorFilterList from '../components/IndicatorFilterList';

class IndicatorModal extends React.Component {
  constructor (props) {
    super(props);
    this.handleOpenModal      = this.handleOpenModal.bind(this);
    this.onIndicatorSelected  = this.onIndicatorSelected.bind(this);
    this.selectedIndicators   = [];
    this.onOkClick = this.onOkClick.bind(this);

  }

  handleOpenModal(value){
    this.props.handleOpenModal(value);
  }

  onIndicatorSelected(indicator,selected){
    if(selected){
      this.selectedIndicators.push(indicator);
    }else{
      //remove it
      this.selectedIndicators = this.selectedIndicators.filter( i => i.label !== indicator.label);
    }
  }
  onOkClick(){
    this.handleOpenModal(false);
    let fIndicators = [];
    let indicators = this.props.data.indicators;
    let selectedIndicatorsLabels = this.selectedIndicators.map(i => i.label);
    for (var i = 0; i < indicators.length; i++) {
      if(!selectedIndicatorsLabels.includes(indicators[i].label)){
        fIndicators.push(indicators[i]);
      }
    }
    this.props.onSelectIndicators(fIndicators);
  }
  render(){
    return (
      <Modal className='custom_modal' show={this.props.show} onHide={() => this.handleOpenModal(false)} centered>
        <Modal.Header closeButton className="custom_modal_header">
          <Modal.Title> Select your indicators </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='custom_modal_content'>
            <div className='custom_top_content m-b-10 p-10'>
              <span>Filters: </span>

              <div>
                <span>Region</span>
                <select className='m-l-5'>
                  <option>basin-wide</option>
                </select>
              </div>

              <div>
                <span>Sector</span>
                <select className='m-l-5'>
                  <option>All</option>
                </select>
              </div>
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
