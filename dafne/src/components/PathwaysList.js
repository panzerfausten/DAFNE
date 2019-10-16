import React from 'react';
import Pathway from "./Pathway.js";
class PathwaysList extends React.Component {
  constructor(){
    super();
    this.state = {
      pathways : [1,2,3,4,5]
    }
  }
  render(){
    const pathways = this.state.pathways;
    return (
        <div>
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
