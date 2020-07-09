import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import EyeOn from "../img/icons/eye_on.png";
import Pathway from "../img/pathway.png";
import CancelButton from "../img/icons/cancel.png";
import Info from "../img/icons/info.png";
import Create_Compare from "../img/create_compare_perspective.png";


import "../style/style.scss";


class WelcomeModal extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      show:true,
    }
    this.handleOpenModal = this.handleOpenModal.bind(this);
  }

  handleOpenModal(value){
    this.setState({ show:value });
  }

  renderContent(){
    return(
      <div className='custom_modal_content'>
        <p className='wrapper_description' style={{textAlign:'center'}}>
          <p>Contents now present on DAFNE Multi-perspective visualization tool are those related to 2019 NSL.</p>

          <p>After the meeting several improvements and detailed simulations were run and final results are still being processed.</p>

          <p>Once these results will be ready, the content will be updated and credentials will be circulated to Stakeholder</p>
        </p>
        <Button style={{backgroundColor:'#458dc5',borderColor:'#249fff'}} onClick={() => this.handleOpenModal(false)}>OK</Button>
      </div>
    )
  }

  render(){
    return (
      <div>
        <Modal className='custom_modal'
               size="lg"
               show={this.state.show}
               onHide={() => this.handleOpenModal(false)}
               centered>
          <Modal.Header closeButton className="custom_modal_header">
            <Modal.Title>Notice</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.renderContent()}
          </Modal.Body>

        </Modal>
      </div>
    );
  }
}

WelcomeModal.propTypes = {
};

WelcomeModal.defaultProps = {
};

export default WelcomeModal;
