import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import CommentList from '../components/CommentList';
import DafneApi from '../api/DafneApi';
import "../style/style.scss";


class CommentsModal extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      comment:'',
      comments:[]
    }
    this.handleOpenModal      = this.handleOpenModal.bind(this);
    this._handleKeyDown       = this._handleKeyDown.bind(this);
    this.onSubmit             = this.onSubmit.bind(this);
  }
  handleOpenModal(value){
    this.props.handleOpenModal(value);
  }
  onChange(e){
    this.setState({
      comment:e.target.value
    })
  }
  loadComments(){
    this.setState({
      comments:[]
    })
    DafneApi.getComments(this.props.pathway_name).then((res) =>{
      this.setState({
        comments:res.comments
      })
    }).catch((err) =>{

    })
  }
  onSubmit(e){
    if(this.state.comment.trim().length > 0){
      //send comment
      DafneApi.createComment(this.props.pathway_name,
                             this.props.pathway_index,
                             this.state.comment).then((res) => {
         this.loadComments();
         this.setState({
           comment:''
         })
      }).catch((err) =>{

      })
    }
  }
  _handleKeyDown(e){
    if(e.key === "Enter"){
      this.onSubmit(e);
    }
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
                   onChange={ (e) => this.onChange(e)}
                   onKeyDown={this._handleKeyDown}
                   type='text'
                   value={this.state.comment}
                   placeholder='Write a comment'></input>
            <Button disabled={!(this.state.comment.trim().length > 0)} className='m-l-10' onClick={(e) => this.onSubmit(e)}>Submit</Button>
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}
CommentsModal.propTypes = {
  show                : PropTypes.bool,
  handleOpenModal     : PropTypes.func,
  pathway_name        : PropTypes.string,
  pathway_index       : PropTypes.string
};


CommentsModal.defaultProps = {
  show               : false,
  handleOpenModal    : () => {},
  pathway_name        : '',
  pathway_index       : -1
};

export default CommentsModal;
