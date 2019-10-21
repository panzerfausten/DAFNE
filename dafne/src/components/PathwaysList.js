import React from 'react';
import Pathway from "./Pathway.js";
class PathwaysList extends React.Component {
  constructor(){
    super();
    this.state = {
      pathways : [1,2,3]
    }
  }
  render(){
    const pathways = this.state.pathways;
    return (
        <div style={{maxHeight:300,overflow:"auto",paddingLeft:"1%",paddingRight:"1%"}}>
        {
          pathways.map((item,index) => (
            <Pathway item={item} key={index}></Pathway>
          ))
        }
        </div>
    );
  }
}
export default PathwaysList;
// {companies.map((item,index) =>
//   (
//     <KCompanyRow key={index}
//                  company={item}
//                  user={this.props.user}
//                  shortView={this.props.shortView}
//                  viewLabel={this.props.viewLabel}
//                  onClickCompany={(company) => this.props.onClickCompany(company)}
//     />
//   )
// )}
