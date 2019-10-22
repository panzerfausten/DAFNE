import React from 'react';
import Pathway from "./Pathway.js";
import PropTypes from 'prop-types';
class PathwaysList extends React.Component {
  constructor(){
    super();
    this.state = {
      pathways : []
    }
    this.onClick = this.onClick.bind(this);
  }
  componentDidMount(){
    this.setState({
      pathways:this.props.data.pathways
    });
  }
  onClick(pathway){
    this.props.onClick(pathway);
  }

  render(){
    const pathways = this.state.pathways;
    return (
        <div style={{maxHeight:300,overflow:"auto",paddingLeft:"1%",paddingRight:"1%"}}>
        {
          pathways.map((item,index) => (
            <Pathway item={item} key={index} onClick={(pathway) => this.onClick(pathway)}></Pathway>
          ))
        }
        </div>
    );
  }
}
PathwaysList.propTypes = {
  onClick : PropTypes.func
};


PathwaysList.defaultProps = {
  onClick : (pathway) => {}
};

export default PathwaysList;
