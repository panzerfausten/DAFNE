import React, { useState } from 'react';
import "../style/style.scss";
import EyeImg from "../img/icons/eye.png";
import { Collapse } from 'react-bootstrap';
import PropTypes from 'prop-types';
class Pathway extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isCollapseOpen:false
    }
    this.setOpen = this.setOpen.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  setOpen(value){
    this.setState({isCollapseOpen:value});
  }
  onClick(){
    this.props.onClick(this.props.item);
    this.setOpen(!this.state.isCollapseOpen);
  }
  onMouseOver(){
    this.props.onClick(this.props.item);
  }
  render(){
    const isCollapseOpen = this.state.isCollapseOpen;

    return (
      <div className='pathway m-b-15'>
        <div className='pathway_wrapper_img'>
          <img src={EyeImg}></img>
        </div>
        <div className='pathway_wrapper_content' onMouseOver={() => this.onMouseOver()} onClick={() => this.onClick()} >
          <div className='pathway_header' >
            <div className='pathway_header_title p-l-15'>{`Solution pathway ${this.props.item.name}`}</div>
            <div className="arrow-filler" >
              <div className="arrow-down"></div>
            </div>
            <div className="arrow-right"></div>
          </div>
          <Collapse in={isCollapseOpen}>
            <div id="collapse_div">
              {this.props.item.description}
            </div>
          </Collapse>

        </div>
      </div>

    );
  }
}
Pathway.propTypes = {
  onClick : PropTypes.func
};


Pathway.defaultProps = {
  onClick : (pathway) => {}
};

export default Pathway;
