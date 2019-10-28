import React from 'react';
import DafnePlot from "../components/DafnePlot";
import IndicatorTools from '../components/IndicatorTools';
import PathwaysList from '../components/PathwaysList';
import 'rc-checkbox/assets/index.css';
import Checkbox  from 'rc-checkbox';
import GraphA from "../img/icons/graph_a.png";
import GraphC from "../img/icons/graph_c.png";
import Info from "../img/icons/info.png";
import Data from "../data/data.json";
class CreatePerspective extends React.Component {
  constructor(p){
    super(p);
    this.onDeleteIndicator  = this.onDeleteIndicator.bind(this);
    this.onPinIndicator     = this.onPinIndicator.bind(this);
    this.filteredIndicators = [];
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  onDeleteIndicator(indicator){
    this.filteredIndicators.push(indicator);
    this.dafnePlot.filterIndicators(this.filteredIndicators);
  }
  onSelectIndicators(indicators){
    this.filteredIndicators = indicators;
    this.dafnePlot.filterIndicators(this.filteredIndicators);
  }
  onPinIndicator(indicator){
    // alert(JSON.stringify(indicator));
  }
  render(){
    return (
        <div className="flex">
          <div className="filters_area">
            <div className="filters_left_area">
               <div className="title m-b-5">Edit a saved perspective:</div>
               <select>
                <option>choose a perspective</option>
               </select>
            </div>
            <div className='filter_divider_area'></div>
            <div className="filters_right_area">
               <div className="title m-b-5">To create a new perspective, select the indicators and set the filters:</div>
               <div className="filters_right_area_content">
                 <div className='wrapper_select'>
                   <span>Region</span>
                   <select>
                    <option>basin-wide</option>
                   </select>
                 </div>
                 <div className='wrapper_select'>
                   <span>Sector</span>
                   <select>
                    <option>All-sectors</option>
                   </select>
                 </div>
                <div className='wrapper_select'>
                   <span>Scenario</span>
                   <select>
                    <option>No extreme events</option>
                   </select>
                 </div>
               </div>
            </div>
          </div>
          <div className="flex-row">
              <div className="widget" style={{maxWidth:400}}>
                <div className="widget_title">
                  Solution Pathways
                </div>
                <div className="filter">
                  <div className="filter_title">
                    Pathway tools
                  </div>
                  <div clasName="filter_content">
                    <div className="filter_row">
                      <label className="filter_label title" >
                        <Checkbox
                          defaultChecked
                          onChange={() => {}}
                          disabled={false}
                        />
                        Show favourite pathways
                      </label>
                      <div><img src={GraphA} style={{height:25}}></img></div>
                      <div><img src={Info} style={{height:25}}></img></div>

                    </div>
                    <div className="filter_row">
                      <label className="filter_label title" >
                        <Checkbox
                          defaultChecked
                          onChange={() => {}}
                          disabled={false}
                        />
                        Show average alternatives
                      </label>
                      <div><img src={GraphC} style={{height:25}}></img></div>
                      <div><img src={Info} style={{height:25}}></img></div>

                    </div>
                  </div>
                </div>
                <div className="widget_content">
                  <div className="solution_list_title">Solution pathways and their impact on the selected indicators:</div>
                  <PathwaysList data={Data} onClick={(p) => {this.dafnePlot.highlightPathways([p])}}></PathwaysList>
                </div>
              </div>
              <div className="widget" >
                <IndicatorTools data={Data}
                                filteredIndicators={this.filteredIndicators}
                                onSelectIndicators={(indicators) => {this.onSelectIndicators(indicators);}}></IndicatorTools>
                <DafnePlot
                  ref={(dp) => { this.dafnePlot = dp; }}
                  onDeleteIndicator={(indicator) => {this.onDeleteIndicator(indicator);}}
                  onPinIndicator={(indicator) => this.onPinIndicator(indicator) }
                  data={Data}></DafnePlot>
              </div>
          </div>
        </div>
    )
  }

}
//
//
export default CreatePerspective;
