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
  getFavState(index){
    return(this.props.favourites.includes(index));
  }
  render(){
    const pathways = this.state.pathways;
    return (
        <div style={{maxHeight:300,overflow:"auto",paddingLeft:"1%",paddingRight:"1%"}}>
        {
          pathways.map((item,index) => (
            <Pathway item={item} key={index} index={index}
                     onClick={(pathway) => this.onClick(pathway)}
                     onEyeToggled={(index,state) => this.props.onEyeToggled(index,state)}
                     onFavouriteToggled={(index,name,state) => this.props.onFavouriteToggled(index,name,state)}
                     favState={this.getFavState(index)}
                     ></Pathway>
          ))
        }
        </div>
    );
  }
}
PathwaysList.propTypes = {
  onClick : PropTypes.func,
  onEyeToggled: PropTypes.func,
  onFavouriteToggled: PropTypes.func,
  favourites: PropTypes.array
};


PathwaysList.defaultProps = {
  onClick : (pathway) => {},
  onEyeToggled: (index,state) =>{},
  onFavouriteToggled: (index,name,state) =>{},
  favourites : []


};

export default PathwaysList;
