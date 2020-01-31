import React from 'react';
import * as d3 from "d3";
import ReactResizeDetector from 'react-resize-detector';
import cancelButton from "../img/icons/cancel.png";
import pinButton from "../img/icons/pin.png";
import PropTypes from 'prop-types';

class DafnePlotCompare extends React.Component {
  constructor (props) {
    super(props);
    this.margin = {top: 70, right: 50, bottom: 30, left: 70};
    this.svgW   = 0;
    this.svgH   = 0;
    this.width  = 0;
    this.height = 0;
    this.svg    = null;
    this.renderPlot = this.renderPlot.bind(this);
    this.drawAxis = this.drawAxis.bind(this);
    this.convertPathwayDataToDomain = this.convertPathwayDataToDomain.bind(this);
    this.highlightPathways = this.highlightPathways.bind(this);
    this.filterIndicators = this.filterIndicators.bind(this);
    this.getFilteredPathwaysData = this.getFilteredPathwaysData.bind(this);

    this.state = {
      data: [],
      highlightedPathways: [],
      filteredIndicators: [],

    }
    // this.domain = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    this.domain = ["A","B"];
    this.data = []; //we keep a copy so react doesn't mess up
  }
  componentDidMount(){
    this.dafnePlot.addEventListener('resize', (event) => console.log(event.detail));
    this.setState({
      data:this.props.data,
      filteredIndicators: this.props.filteredIndicators
    });
    this.data = this.props.data;
  }
  clear(){
    d3.select("svg").remove();
  }
  highlightPathways(pathways){
    this.setState({
      highlightedPathways : pathways
    }, () => this.renderPlot());

  }
  filterIndicators(indicators){
    this.setState({
      filteredIndicators : indicators,
    }, () => this.renderPlot());
  }

  renderPlot(){
    this.clear();
    let perspectiveA = this.props.perspectiveA;
    let perspectiveB = this.props.perspectiveB;
    let filtersA     = [];
    let filtersB     = [];
    try{
      filtersA       = JSON.parse(JSON.parse(perspectiveA.filter));
    }catch(ex){
    }
    try{
      filtersB       = JSON.parse(JSON.parse(perspectiveB.filter));
    }catch(ex){
    }
    let plotIndicators = this.props.data.indicators;
    let mapFilterIndicators = this.state.filteredIndicators.map(i => i.label);
    plotIndicators = plotIndicators.filter(i => !mapFilterIndicators.includes(i.label));

    //re-set the size
    // this.width  = this.svgW - this.margin.right - this.margin.left;
    this.width  = (this.props.data.indicators.length * 80 ) + 20;
    this.height = this.svgH - this.margin.bottom - this.margin.top;
    if(this.width < 600){
      this.width = 600;
    }
    let svgWidth = this.width + 150;
    if(this.svgW >= this.width){
      svgWidth = this.svgW;
    }else{

    }
    // append the svg object to the body of the page
    this.svg = d3.select("#dafne_plot")
    .append("svg")
      .attr("width", svgWidth)
      .attr("height", this.svgH)
    .append("g")
      .attr("transform",
            "translate(" + this.margin.left + "," + this.margin.top + ")");
    //------------------------------------------------------------------------//
    //get DATA
    let lineData = this.getFilteredPathwaysData();

    //draw rectangles
    this.svg.append("rect")
                   .attr("x",0)
                   .attr("y",0)
                   .attr("width", 288)
                   .attr("height",this.height + 80)
                   .attr("fill","#f4e6cf")
                   .attr("transform",
                         "translate(-" + (this.margin.left - 15) + ",-" + this.margin.top + ")");
   this.svg.append("rect")
                  .attr("x",288)
                  .attr("y",0)
                  .attr("width", 278)
                  .attr("height",this.height + 80)
                  .attr("fill","#d0e2f1")
                  .attr("transform",
                          "translate(-" + (this.margin.left - 15) + ",-" + this.margin.top + ")");

    this.svg.append("rect")
                   .attr("x",566)
                   .attr("y",0)
                   .attr("width", 278)
                   .attr("height",this.height + 80)
                   .attr("fill","#cee2e0")
                   .attr("transform",
                           "translate(-" + (this.margin.left - 15) + ",-" + this.margin.top + ")");

    var xLeft = d3.scalePoint()
              .domain(this.domain)
              .range([-69,470]);
    //create scales
    var x = d3.scalePoint()
              .domain(this.domain)
              .range([0,this.width]);
    var y = null;
    if(this.props.mode === "absolute"){
      y = d3.scaleLinear()
        .domain([this.props.data.metadata.max,this.props.data.metadata.min])
        .range([0,this.height - this.margin.bottom - this.margin.top]);
    }else{
      y = d3.scaleLinear()
        .domain([1,0])
        .range([0,this.height - this.margin.bottom - this.margin.top]);
    }


    let option_showScales = this.props.showScales;
    for (var i = 0; i < plotIndicators.length; i++) {
      let d = plotIndicators[i];
      this.drawAxis(this,this.svg,i,x(this.domain[i]),d);
      this.svg.append("g")
        .attr("transform", `translate(${x(this.domain[i]) + 6}, 20)`)
        .call(
          d3.axisLeft(y)
          .tickFormat(function (d) {
            if(option_showScales){
              return d;
            }else{
              return "";
            }
          })
        )
        .selectAll("line")
            .attr("x2","-12")
            .attr("transform", `translate(6, 0)`)
      // this.svg.append("circle")
      //     .attr("cx",x(this.domain[i]))
      //     .attr("cy",y(this.props.data[i]))
      //     .attr("r",8)
      //     .attr("transform", `translate(6, 0)`)
    }
    let mappedHighlightedPathways = this.state.highlightedPathways.map(p => p.name);

    for (var i = 0; i < lineData.length; i++) {
      let data = null;
      if(this.state.filteredIndicators.length === 0){
          if(this.props.mode === "absolute"){
            data = this.convertPathwayDataToDomain(
              lineData[i].abs
            );
          }else{
            data = this.convertPathwayDataToDomain(
              lineData[i].data
            );
          }
      }else{
        data = this.convertPathwayDataToDomain(
          lineData[i].data
        );
      }


      let lineWidth = "2";
      if(mappedHighlightedPathways.includes(lineData[i].name)){
        lineWidth = "4";
      }

      var line = d3.line()
        .x(function(d){ return x(d.domain)})
        .y(function(d){ return y(d.value)})
        .defined(function (d) {
          return d.value !== null;
        });
        this.svg.append("path")
          .attr("d", line(data))
          .attr("stroke", lineData[i].color)
          .attr("stroke-width", lineWidth)
          .attr("fill", "none")
          .attr("transform", `translate(6, 20)`)


      // var leftData = this.convertPathwayDataToDomain([0.6]);
      // leftData.push(data[0]);
      // leftData[1].domain = "B";
      // var line = d3.line()
      //   .x(function(d){ return xLeft(d.domain)})
      //   .y(function(d){ return y(d.value)});
      //   this.svg.append("path")
      //     .attr("d", line(leftData))
      //     .attr("stroke", lineData[i].color)
      //     .attr("leftLine", "true")
      //     .attr("stroke-width", lineWidth)
      //     .attr("fill", "none")
    }
  }
  getFilteredPathwaysData(){
    let pathways = this.data.pathways.slice();
    let indicators = this.props.data.indicators.slice();
    let filteredIndicatorsPositions = [];

    for (var i = 0; i < this.state.filteredIndicators.length; i++) {
      let indicator = this.state.filteredIndicators[i];
      for (var ii = 0; ii < indicators.length; ii++) {
        if(indicators[ii].label === indicator.label){
          filteredIndicatorsPositions.push(ii);
        }
      }
    }
    if(this.props.data.pathways[0].data.length > (indicators.length - filteredIndicatorsPositions.length)){
        for (var y = 0; y < pathways.length; y++) {
          let obj = {
          }
          obj["color"]       = pathways[y].color;
          obj["name"]        = pathways[y].name;
          obj["description"] = pathways[y].description;
          let line = null;
          if(this.props.mode === "absolute"){
            line = pathways[y].abs.
              filter(function(v,x){
                return !filteredIndicatorsPositions.includes(x)
              });
          }else{
            line = pathways[y].data.
              filter(function(v,x){
                return !filteredIndicatorsPositions.includes(x)
              });
          }

          obj["data"] = line;
          pathways[y] = obj;
      }

    }
    return pathways;

  }
  convertPathwayDataToDomain(pathwayData){
    let data = [];
    for (var i = 0; i < pathwayData.length; i++) {
      let point = {
        "domain": this.domain[i],
        "value": pathwayData[i]
      }
      data.push(point);
    }
    return data;
  }
  drawIcons(t,svg,i,x,data){

  }
  drawAxis(t,svg,i,x,data){
    let width = 80;
    let topOffset = -30;
    let height = t.svgH - this.margin.top - this.margin.bottom;
    let labelContainerHeight = this.margin.top +  (topOffset / 2);
    let indexLabels = [1,4,7];
    svg.append('g')
          .attr("transform",
                  `translate(0,${20})`)
          .append('rect')
            .attr("width",width)
            .attr("height",labelContainerHeight )
            .attr("x",x - 40)
            .attr("fill",data.color)
            .attr("transform",
                  `translate(0,${this.margin.top * - 1})`);
    svg.append('g')
          .attr("transform",
                  `translate(0,${20})`)
          .append('rect')
             .attr("width",width)
             .attr("height",height - (labelContainerHeight / 2) )
             .attr("x",x - 40)
             .attr("fill","#c9ced1a3")
             .attr("transform",
                   `translate(0,${topOffset})`);
   svg.append('g')
         .attr("transform",
                 `translate(0,${20})`)
         .append("text")
          .text(data.unit)
          .attr("x",x)
          .attr("text-anchor","middle")
          .style("font-size", "12px")
          .attr("transform",
                `translate(0,-18)`);

    svg.append('g')
          .attr("transform",
                  `translate(0,${20})`)
          .append("text")
            .text(data.label)
            .attr("x",x)
            .attr("text-anchor","middle")
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .attr("transform",
                  `translate(0,-${labelContainerHeight})`);
    //bottom text

    if(indexLabels.includes(i)){
      let label = "";
      if(i === 1){
        if(this.props.perspectiveA.hasOwnProperty("name")){
          label = this.props.perspectiveA.name;
        }else{
          label = "Select a perspective";
        }
      }
      if(i === 4){
        label = "Common indicators";
      }
      if(i === 7){
        if(this.props.perspectiveB.hasOwnProperty("name")){
          label = this.props.perspectiveB.name;
        }else{
          label = "Select a perspective";
        }
      }
      svg.append('g')
            .attr("transform",
                    `translate(0,${this.height})`)
            .append("text")
             .text(label)
             .attr("x",x)
             .attr("text-anchor","middle")
             .style("font-size", "12px")
     }

    // add icons
    // svg.append('g')
    //       .attr("transform",
    //               `translate(0,${20})`)
    //       .append("svg:image")
    //        .attr("x",x)
    //        .attr("width",20)
    //        .attr("height",20)
    //        .attr("xlink:href", cancelButton)
    //        .attr("transform",
    //              `translate(15,${height - (labelContainerHeight * 2) + 25})`)
    //        .attr("class","svgButton")
    //        .datum(data)
    //        .on("click", function(d) {
    //          t.props.onDeleteIndicator(d);
    //         });
    // svg.append('g')
    //       .attr("transform",
    //               `translate(0,${20})`)
    //        .append("svg:image")
    //           .attr("x",x)
    //           .attr("width",20)
    //           .attr("height",20)
    //           .attr("xlink:href", pinButton)
    //           .attr("transform",
    //                 `translate(-30,${height - (labelContainerHeight * 2) + 25})`)
    //           .attr("class","svgButton")
    //           .datum(data)
    //           .on("click", function(d) {
    //              t.props.onPinIndicator(d);
    //            });
  }
  onResize = (w,h) => {
    this.svgW = w;
    this.svgH = h;
    this.renderPlot();
  }
  render(){
    return (
      <div
        id="dafne_plot"
        style={{maxHeight: "500px",overflowY:"hidden",overflowX:"auto",marginLeft:"0px"}}
        ref={ref => this.dafnePlot = ref}>
        <ReactResizeDetector  handleWidth handleHeight onResize={this.onResize} />

      </div>
    )
  }
}
DafnePlotCompare.propTypes = {
  onDeleteIndicator  : PropTypes.func,
  onPinIndicator     : PropTypes.func,
  filteredIndicators : PropTypes.array,
  mode               : PropTypes.string,
  perspectiveA       : PropTypes.object,
  perspectiveB       : PropTypes.object
};


DafnePlotCompare.defaultProps = {
  onDeleteIndicator  : (indicator) => {},
  onPinIndicator     : (indicator) => {},
  filteredIndicators : [],
  mode               : 'satisfaction',
  perspectiveA       : {},
  perspectiveB       : {}

};
export default DafnePlotCompare;
