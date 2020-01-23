import React from 'react';
import PropTypes from 'prop-types';
class PerspectivePicker extends React.Component {
  constructor(p){
    super(p);
    this.state = {
      selectedPerspectiveIndex:-1,
    }
    this.onSelectedPerspective = this.onSelectedPerspective.bind(this);
  }
  onSelectedPerspective(event){
    let index = event.target.value;
    let p = this.props.perspectives[index];
    let f = JSON.parse(JSON.parse(p.filter));
      this.setState({
        selectedPerspectiveIndex:index
      }, () => {
        this.props.onPerspectiveSelected(this.props.perspectives[index]);
      })
  }
  render(){
    return(
      <select onChange={this.onSelectedPerspective} value={this.state.selectedPerspectiveIndex}>
       <option>choose a perspective</option>
       {
         this.props.perspectives.map((perspective,index) =>{
           if(index === this.state.selectedPerspectiveIndex){
             return (<option selected value={index}>{`${perspective.name} - ${perspective.owner.name} ${perspective.owner.last_name}`}</option>);
           }else{
             return (<option value={index}>{`${perspective.name} - ${perspective.owner.name} ${perspective.owner.last_name}`}</option>);
           }
         }
         )
       }
      </select>
    )
  }
}
PerspectivePicker.propTypes = {
  onPerspectiveSelected : PropTypes.func,
  perspectives: PropTypes.array
};


PerspectivePicker.defaultProps = {
  onPerspectiveSelected : (perspective) => {},
  perspectives: []

};
export default PerspectivePicker;
