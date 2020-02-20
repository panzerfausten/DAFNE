import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import CommentList from '../components/CommentList';

import "../style/style.scss";


class CommentsModal extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      comment:'',
      comments:[{comment:'one comment'},{comment:'two comment'}]
    }
    this.handleOpenModal      = this.handleOpenModal.bind(this);

  }

  handleOpenModal(value){
    this.props.handleOpenModal(value);
  }

  render(){
    return (
      <Modal className='custom_modal'
             size="lg"
             show={this.props.show}
             onHide={() => this.handleOpenModal(false)}
             centered>
        <Modal.Header closeButton className="custom_modal_header">
          <Modal.Title> Add a comment </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='custom_modal_content'>
            <div className='background-gray p-10'>
              <CommentList comments={this.state.comments}></CommentList>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className='comments-input-area background-gray p-10'>
            <input className='input-comment p-l-5 p-r-5'
                   type='text'
                   value={this.state.comment}
                   placeholder='Write a comment'></input>
            <Button className='m-l-10'>Submit</Button>
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}
CommentsModal.propTypes = {
  show                : PropTypes.bool,
  handleOpenModal     : PropTypes.func,
};


CommentsModal.defaultProps = {
  show               : false,
  handleOpenModal    : () => {},
};

export default CommentsModal;
