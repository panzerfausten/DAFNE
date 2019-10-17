import React from 'react';
import "../style/style.scss";

class Pathway extends React.Component {
  render(){
    return (
      <div style={{alignItems:"center",marginBottom:15,height:30,display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
        <div style={{width:35,display:"flex",justifyContent:"center",alignItems:"center"}}>
          i
        </div>
        <div style={{flex:1,backgroundColor:"#bcbec0",paddingLeft:15}}>
          {`Solution pathway ${this.props.item}`}
        </div>
        <div className="arrow-filler" style={{
                                              backgroundColor:"#bcbec0",
                                              height:24,
                                              display:"flex",
                                              alignItems:"center"}}>
          <div className="arrow-down">
          </div>
        </div>
        <div className="arrow-right">
        </div>
      </div>

    );
  }
}
export default Pathway;
