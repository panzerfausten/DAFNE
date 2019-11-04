import React, { useState } from 'react';
import "../style/style.scss";
import EyeImg from "../img/icons/eye.png";
import FavOn from "../img/icons/favorite_on.png";
import FavOff from "../img/icons/favorite_off.png";
import { Collapse,Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

var classNames = require('classnames');


class Pathway extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isCollapseOpen:false,
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
    console.log(this.props.item.name,this.pathway.getBoundingClientRect().top);

  }
  onMouseOver(){
    this.props.onClick(this.props.item);
  }
  render(){
    const isCollapseOpen = this.state.isCollapseOpen;
    let fillerCollor = isCollapseOpen ? this.props.item.color : "#bcbec0";
    // var rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
    //border styles addes
    let headerClass = classNames({
      'pathway_header_title': true,
      'p-l-15': true,
      'b-t-2': this.state.isCollapseOpen,
      'b-l-2': this.state.isCollapseOpen,
      'b-b-2': this.state.isCollapseOpen,
    });
    let arrowClass =  classNames({
      'arrow-filler': true,
      'b-t-2': this.state.isCollapseOpen,
      'b-r-2': this.state.isCollapseOpen,
      'b-b-2': this.state.isCollapseOpen,
    });
    let arrowRight =  classNames({
      'arrow-right': true,
      'triangle_red': this.state.isCollapseOpen,
    });
    let arrowRightSyleObj = {
      borderLeftColor: fillerCollor
    }
    let borderStyleColor = {
      borderColor: fillerCollor
    }
    return (
      <div className='pathway m-b-15'
        ref={ref => this.pathway = ref}>
        <div className='pathway_wrapper_img'>
          <img src={EyeImg}></img>
        </div>
        <div className='pathway_wrapper_content' onMouseOver={() => this.onMouseOver()} onClick={() => this.onClick()} >
          <div className='pathway_header'  >
            <div className={headerClass} style={borderStyleColor}>{`Solution pathway ${this.props.item.name}`}</div>
            <div className={arrowClass} style={borderStyleColor} >
              <div className="arrow-down"></div>
            </div>
            <div className={arrowRight} style={arrowRightSyleObj}></div>
          </div>
          <Collapse in={isCollapseOpen}>
            <div id="collapse_div">
              <div className="collapse_div m-t-10 m-r-10 m-b-10">
                <div className='wrapper_description p-10'>{this.props.item.description}</div>
                <div className='wrapper_row p-10'>
                  <Button className='btn btn_modal'>Details in Geoportal</Button>
                  <div className='btn_fav'>
                    <img src={FavOff} className='fav_icon'></img>
                    Mark as favorite
                  </div>
                </div>
              </div>
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
