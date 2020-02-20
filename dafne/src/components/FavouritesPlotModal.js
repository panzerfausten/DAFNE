import React from 'react';
import "../style/style.scss";
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import FavouritesPlot from "../components/FavouritesPlot";
class FavouritesPlotModal extends React.Component {
  constructor (props) {
    super(props);
    this.handleOpenModal      = this.handleOpenModal.bind(this);
  }
  componentDidMount(){
    // this.fp.renderPlot();

  }
  handleOpenModal(value){
    this.props.handleOpenModal(value);
  }
  render(){
    return (
      <Modal className='custom_modal' show={this.props.show} onHide={() => this.handleOpenModal(false)} centered>
        <Modal.Header closeButton className="custom_modal_header">
          <Modal.Title>Favourites pathways</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FavouritesPlot ref={(fp) => { this.fp = fp; }}>
          </FavouritesPlot>
        </Modal.Body>
        <Modal.Footer>
          <Button className='btn_modal' block onClick={() => this.handleOpenModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
FavouritesPlotModal.propTypes = {
  show                : PropTypes.bool,
  handleOpenModal     : PropTypes.func,
};


FavouritesPlotModal.defaultProps = {
  show               : false,
  handleOpenModal    : () => {},
};

export default FavouritesPlotModal;
