import React, { useState } from 'react';
import "../style/style.scss";
import EyeImg from "../img/icons/eye.png";
import { Collapse } from 'react-bootstrap';

class Pathway extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isCollapseOpen:false
    }
    this.setOpen = this.setOpen.bind(this);
  }

  setOpen(value){
    this.setState({isCollapseOpen:value});
  }

  render(){
    const isCollapseOpen = this.state.isCollapseOpen;

    return (
      <div className='pathway m-b-15'>
        <div className='pathway_wrapper_img'>
          <img src={EyeImg}></img>
        </div>
        <div className='pathway_wrapper_content'>
          <div className='pathway_header'>
            <div className='pathway_header_title p-l-15'>{`Solution pathway ${this.props.item}`}</div>
            <div className="arrow-filler" onClick={() => this.setOpen(!isCollapseOpen)}>
              <div className="arrow-down"></div>
            </div>
            <div className="arrow-right"></div>
          </div>
          <Collapse in={isCollapseOpen}>
            <div id="collapse_div">
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
              terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
              labore wes anderson cred nesciunt sapiente ea proident.
            </div>
          </Collapse>

        </div>
      </div>

    );
  }
}
export default Pathway;
