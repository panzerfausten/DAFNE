import React from 'react';
import "../style/style.scss";
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import IndicatorFilterList from '../components/IndicatorFilterList';

class IndicatorFilter extends React.Component {
  constructor (props) {
    super(props);
    this.state={
      indicators:[ { name:'Energy Gibe 1',},{ name:'Energy Gibe 2',} ,{ name:'Energy Gibe 3',} ,{ name:'Energy K',}  ]
    }
    this.handleOpenModal      = this.handleOpenModal.bind(this);
    this.onIndicatorSelected  = this.onIndicatorSelected.bind(this);
  }

  handleOpenModal(value){
    this.props.handleOpenModal(value);
  }

  onIndicatorSelected(indicator){
    console.log(indicator)
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
              <select multiple>
                {
                  this.props.data.indicators.map((indicator,index) => (
                    <option item={indicator} key={index}> {indicator.label} </option>
                  ))
                }

              </select>
              <div className='custom_bottom_content'>
                <IndicatorFilterList indicators={this.state.indicators} onClick={this.onIndicatorSelected}/>
                </div>
            </div>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button className='btn_modal' block onClick={() => this.handleOpenModal(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
IndicatorFilter.propTypes = {
  show                : PropTypes.bool,
  handleOpenModal     : PropTypes.func,
  onClick             : PropTypes.func,
  data                : PropTypes.object,
  filteredIndicators  : PropTypes.array,
  onSelectIndicators  : PropTypes.func

};


IndicatorFilter.defaultProps = {
  show               : false,
  handleOpenModal    : () => {},
  onClick            : () => {},
  data               : [],
  filteredIndicators : [],
  onSelectIndicators : (indicators) => {}
};

export default IndicatorFilter;
