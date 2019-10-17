import React from 'react';
import DafnePlot from "../components/DafnePlot";
import IndicatorTools from '../components/IndicatorTools';
import PathwaysList from '../components/PathwaysList';
import 'rc-checkbox/assets/index.css';
import Checkbox  from 'rc-checkbox';

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
                <div className="filter">
                  <div className="filter_title">
                    Pathway tools
                  </div>
                  <div clasName="filter_content">
                    <div className="filter_row">
                      <label className="filter_label" >
                        <Checkbox
                          defaultChecked
                          onChange={() => {}}
                          disabled={false}
                        />
                        Show favourite pathways
                      </label>
                      <div>i</div>
                      <div>i</div>
                    </div>
                    <div className="filter_row">
                      <label className="filter_label" >
                        <Checkbox
                          defaultChecked
                          onChange={() => {}}
                          disabled={false}
                        />
                        Show average alternatives
                      </label>
                      <div>i</div>
                      <div>i</div>
                    </div>
                  </div>
                </div>
                <div className="widget_content">
                  <div className="solution_list_title">Solution pathways and their impact on the selected indicators:</div>
                  <PathwaysList></PathwaysList>
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
