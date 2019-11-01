import React from 'react';
import "../style/style.scss";
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

class SavePerspectiveModal extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      name:"",
    }
    this.handleOpenModal      = this.handleOpenModal.bind(this);
    this.onChange             = this.onChange.bind(this);
    this.savePerspective      = this.savePerspective.bind(this);
    this.onExitModal          = this.onExitModal.bind(this);
  }

  onExitModal(){
    this.setState({name : ''});
  }

  handleOpenModal(value){
    this.props.handleOpenModal(value);
  }

  onChange(target){
    this.setState({[target.name] : target.value });
  }

  savePerspective(){
    let name = this.state.name;

    if(name.trim() !== ''){
      //do sometring
    }else{
      alert('The name can not be empty');
    }
  }


  render(){
    return (
      <Modal className='custom_modal'
             show={this.props.show}
             onHide={() => this.handleOpenModal(false)}
             onExit={() => this.onExitModal()}
             centered>
        <Modal.Header closeButton className="custom_modal_header">
          <Modal.Title> Save your perspective </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='custom_modal_content m-t-20 m-b-20'>
            <label className='txt_bold'>Name your perspective:</label>
            <input type='text'
                   name='name'
                   value={this.state.name}
                   className='width100 p-l-5'
                   placeholder='Type the name'
                   onChange={(e) => this.onChange(e.target)}>
            </input>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className='btn_modal' block onClick={() => this.savePerspective()}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
SavePerspectiveModal.propTypes = {
  show                : PropTypes.bool,
  handleOpenModal     : PropTypes.func,
  dataSetId           : PropTypes.string,
  perspective         : PropTypes.object
};


SavePerspectiveModal.defaultProps = {
  show               : false,
  handleOpenModal    : () => {},
  dataSetId          : '',
  perspective        : {}
};

export default SavePerspectiveModal;
