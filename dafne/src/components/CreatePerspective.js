import React from 'react';
import DafnePlot from "../components/DafnePlot";
import IndicatorTools from '../components/IndicatorTools';

class CreatePerspective extends React.Component {
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  render(){
    return (
        <div className="flex">
          <div className="filters_area">
          </div>
          <div className="flex-row">
              <div className="widget">
                <div className="widget_title">
                  Solution Pathways
                </div>
                <div className="widget_content">
                  <div className="filters_area">
                  </div>
                </div>
              </div>
              <div className="widget" style={{flex:2,paddingLeft: 50}}>
                <div className="widget_title">
                  Indicators
                </div>
                <div className="widget_content">
                  <div className="filters_area" style={{marginBottom:30}}>
                    <IndicatorTools></IndicatorTools>
                  </div>
                  <DafnePlot></DafnePlot>
                </div>
              </div>
          </div>
        </div>
    )
  }

}
//
//
export default CreatePerspective;
