import React, { useState } from 'react';
import "../style/style.scss";
import EyeOn from "../img/icons/eye_on.png";
import EyeOff from "../img/icons/eye_off.png";
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
      isPathwayHidden:false,
      isFavorited:false,
      isHovered:false
    }
    this.setOpen           = this.setOpen.bind(this);
    this.onClick           = this.onClick.bind(this);
    this.toggleEye         = this.toggleEye.bind(this);
    this.toggleFavorite    = this.toggleFavorite.bind(this);
    this.onCommentsClicked = this.onCommentsClicked.bind(this);
    this.onMouseLeave      = this.onMouseLeave.bind(this);
    this.openLink          = this.openLink.bind(this);
  }

  setOpen(value){
    this.setState({isCollapseOpen:value});
  }
  onClick(){
    this.props.onClick(this.props.item);
    this.setOpen(!this.state.isCollapseOpen);
  }
  onMouseOver(){
    this.setState({
      isHovered:true
    })
    this.props.onClick(this.props.item);
  }
  onMouseLeave(){
    this.setState({
      isHovered:false
    })
  }
  toggleEye(){
    this.setState({
      isPathwayHidden : !this.state.isPathwayHidden
    }, ()=> {
      this.props.onEyeToggled(this.props.index,this.state.isPathwayHidden);
    });
  }
  toggleFavorite(e){
    e.stopPropagation();
    this.props.onFavouriteToggled(this.props.index,this.props.item.name,!this.props.favState);
  }
  onCommentsClicked(e){
    e.stopPropagation();
    let item = this.props.item;
    item["index"] = this.props.index;
    this.props.onCommentsClicked(item);

  }
  openLink(e){
    e.stopPropagation();
    window.open(this.props.item.url, '_blank');
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
    let currentBgColor = (this.state.isHovered || this.state.isCollapseOpen) ? this.props.item.color : "#bcbec0";
    let currentBgDownColor = (this.state.isHovered || this.state.isCollapseOpen) ? "5px solid white" : "5px solid #1b75bc";

    let arrowRightSyleObj = {
      borderLeftColor: currentBgColor
    }
    let arrowDownStyleObj = {
      borderTop:currentBgDownColor
    }
    let borderStyleColor = {
      borderColor: fillerCollor,
      backgroundColor: currentBgColor
    }
    let borderStyleColorHover = {
      borderColor: fillerCollor,
      color:'white',
      backgroundColor: this.props.item.color,
    }
    return (
      <div className='pathway m-b-15'
        ref={ref => this.pathway = ref}>
        <div className='pathway_wrapper_img' style={{cursor:'pointer'}}>
          <img src={!this.props.hidState ? EyeOn : EyeOff}  onClick={this.toggleEye} className="eye"></img>
        </div>
        <div className='pathway_wrapper_content' onMouseLeave={this.onMouseLeave}  onMouseOver={() => this.onMouseOver()} onClick={() => this.onClick()} >
          <div className='pathway_header'  >
            <div className={headerClass} style={(this.state.isHovered || this.state.isCollapseOpen) ? borderStyleColorHover : borderStyleColor}> {`Solution pathway ${this.props.item.name}`}</div>
            <div className={arrowClass} style={borderStyleColor} >
              <div className="arrow-down" style={arrowDownStyleObj}></div>
            </div>
            <div className={arrowRight} style={arrowRightSyleObj}></div>
          </div>
          <Collapse in={isCollapseOpen}>
            <div id="collapse_div">
              <div className="collapse_div m-t-10 m-r-10 m-b-10">
                <div className='wrapper_description p-10' style={{fontSize:11}}>{this.props.item.description}</div>
                <div className='wrapper_row p-10'>
                  <Button className='btn btn_modal' onClick={(e) => this.openLink(e)} style={{width:200}}>Details in Geoportal</Button>
                  <div className='btn_fav' onClick={this.toggleFavorite}>
                    <img src={this.props.favState ? FavOn : FavOff} className='fav_icon'></img>
                    Mark as favourite
                  </div>
                </div>
                <div className='wrapper_row p-10'>
                  <Button className='btn btn_modal' onClick={this.onCommentsClicked} style={{width:200}}>Comments</Button>
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
  onClick : PropTypes.func,
  onEyeToggled: PropTypes.func,
  onFavouriteToggled: PropTypes.func,
  onCommentsClicked: PropTypes.func
};


Pathway.defaultProps = {
  onClick : (pathway) => {},
  onEyeToggled: (index,state) =>{},
  onFavouriteToggled: (index,name,state) =>{},
  onCommentsClicked: (item) =>{}
};

export default Pathway;
