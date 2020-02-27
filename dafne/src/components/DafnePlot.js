import React from 'react';
import * as d3 from "d3";
import ReactResizeDetector from 'react-resize-detector';
import cancelButton from "../img/icons/cancel.png";
import pinButton from "../img/icons/pin.png";
import PropTypes from 'prop-types';
const millify = require('millify');

class DafnePlot extends React.Component {
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
    this.generateDomain = this.generateDomain.bind(this);
    this.drawLabel      = this.drawLabel.bind(this);
    this.state = {
      data: [],
      highlightedPathways: [],
      filteredIndicators: [],

    }
    this.domain = ["A","B","C","D","E","F","G","H","I"];
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
  generateDomain(){
    return new Array(this.props.data.indicators.length + 1).fill( 1 ).map( ( _, i ) => String.fromCharCode( 65 + i ) );
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
    this.domain = this.generateDomain();
    this.clear();
    let plotIndicators = this.state.data.indicators;
    let mapFilterIndicators = this.state.filteredIndicators.map(i => i.label);
    plotIndicators = plotIndicators.filter(i => !mapFilterIndicators.includes(i.label));

    //re-set the size
    // this.width  = this.svgW - this.margin.right - this.margin.left;
    this.width  = (this.state.data.indicators.length * 150 ) + 20;
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
    //create scales-------------------------------------------------------------
    var x = d3.scalePoint()
              .domain(this.domain)
              .range([0,this.width]);

    let scales = [];
    for (var i = 0; i < plotIndicators.length; i++) {
      let max = plotIndicators[i].max;
      let min = plotIndicators[i].min;
      let funDirection = plotIndicators[i].funDirection;
      let scale = null;

      if(this.props.mode === "absolute"){
        if(funDirection === "minimize"){
          scale = d3.scaleLinear()
            .domain([min,max])
            .range([0,this.height - this.margin.bottom - this.margin.top]);
        }else{
          scale = d3.scaleLinear()
            .domain([max,min])
            .range([0,this.height - this.margin.bottom - this.margin.top]);
        }

      }else{
        scale = d3.scaleLinear()
          .domain([1,0])
          .range([0,this.height - this.margin.bottom - this.margin.top]);
      }
      scales.push(scale);
    }

    var xLeft = d3.scalePoint()
              .domain(this.domain)
              .range([-69,470]);
    //--------------------------------------------------------------------------
    function drawScale(_this,scale,indicator){
      _this.svg.append("g")
        .attr("transform", `translate(${x(_this.domain[i]) + 6}, 0)`)
        .call(
          d3.axisLeft(scale) //call the scale at position i
          .tickFormat(function (d) {
            if(option_showScales){
              return millify.default(d);
            }else{
              return "";
            }
          })
        )
        .selectAll("line")
            .attr("x2","-12")
            .attr("transform", `translate(6, 0)`)
    }
    //--------------------------------------------------------------------------
    let option_showScales = this.props.showScales;
    for (var i = 0; i < plotIndicators.length; i++) {
      let d = plotIndicators[i];
      this.drawAxis(this,this.svg,i,x(this.domain[i]),d);
      let funDirection = d.funDirection;
      drawScale(this,scales[i],plotIndicators[i]);
    }

    let mappedHighlightedPathways = this.state.highlightedPathways.map(p => p.name);

    for (var i = 0; i < lineData.length; i++) {
      if(this.props.hiddenPathways.includes(i)){
        continue;
      }
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
      let mode = this.props.mode;
      let maxVal = this.props.data.metadata.max;
      var line = d3.line()
        .x(function(d){ return x(d.domain)})
        .y(function(d){
          return scales[d.i](d.value)
        })
        .defined(function (d) {
          return d.value !== null;
        });
      let path =
      this.svg.append("path")
        .attr("d", line(data))
        .attr("stroke", lineData[i].color)
        .attr("stroke-width", lineWidth)
        .attr("fill", "none")
        .attr("transform", `translate(6, 0)`);
      if(this.props.favouritedPathways.includes(i)){
        path.style("stroke-dasharray", ("3, 3"))
      }

    }
  }
  getFilteredPathwaysData(){
    let pathways = this.data.pathways.slice();
    let indicators = this.state.data.indicators.slice();
    let filteredIndicatorsPositions = [];

    for (var i = 0; i < this.state.filteredIndicators.length; i++) {
      let indicator = this.state.filteredIndicators[i];
      for (var ii = 0; ii < indicators.length; ii++) {
        if(indicators[ii].label === indicator.label){
          filteredIndicatorsPositions.push(ii);
        }
      }
    }
    if(this.state.data.pathways[0].data.length > (indicators.length - filteredIndicatorsPositions.length)){
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
        "value": pathwayData[i],
        "funDirection": this.props.data.indicators[i].funDirection,
        "i":i
      }
      data.push(point);
    }
    return data;
  }
  drawLine(t,svg,i,x,y,data){
    var line = d3.line()
      .x(function(d){ return x("A")})
      .y(function(d){ return y(1)});
      this.svg.append("path")
        .attr("d", line(data))
        .attr("stroke", "black")
        .attr("stroke-width", "2")
        .attr("fill", "none")
        .attr("transform", `translate(6, 0)`);

  }
  drawIcons(t,svg,i,x,data){

  }
  drawLabel(t,svg,i,x,data,labelContainerHeight){
    let nLines = data.very_short / 10;
    let lines = data.very_short.match(/.{1,11}/g);
    svg.append("a")
      .attr("href",data.url)
      .attr("target","_blank")
      .append("text")
        .text(lines[0])
        .attr("x",x)
        .attr("text-anchor","middle")
        .style("font-size", "12px")
        .style("font-weight", "bold")
        .attr("transform",
              `translate(0,-${labelContainerHeight})`);
    svg.append("a")
      .attr("href",data.url)
      .attr("target","_blank")
      .append("text")
      .text(lines[1])
      .attr("x",x)
      .attr("text-anchor","middle")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .attr("transform",
            `translate(0,-${labelContainerHeight-15})`);
  }
  drawAxis(t,svg,i,x,data){
    let width = 82;
    let topOffset = -30;
    let height = t.svgH - this.margin.top - this.margin.bottom;
    let labelContainerHeight = this.margin.top +  (topOffset / 2);
    svg.append('rect')
       .attr("width",width)
       .attr("height",labelContainerHeight )
        .attr("x",x - 40)
       .attr("fill",data.color)
       .attr("transform",
             `translate(0,${this.margin.top * - 1})`);
    svg.append('rect')
       .attr("width",width)
       .attr("height",height - (labelContainerHeight / 2) )
       .attr("x",x - 40)
       .attr("fill","#c9ced1a3")
       .attr("transform",
             `translate(0,${topOffset})`);

    svg.append("text")
      .text(data.unit)
      .attr("x",x)
      .attr("text-anchor","middle")
      .style("font-size", "12px")
      .attr("transform",
            `translate(0,-18)`);

    this.drawLabel(t,svg,i,x,data,labelContainerHeight);
    // add icons
    svg.append("svg:image")
       .attr("x",x)
       .attr("width",20)
       .attr("height",20)
       .attr("xlink:href", cancelButton)
       .attr("transform",
             `translate(15,${height - (labelContainerHeight * 2) + 25})`)
       .attr("class","svgButton")
       .datum(data)
       .on("click", function(d) {
         t.props.onDeleteIndicator(d);
        });

     svg.append("svg:image")
        .attr("x",x)
        .attr("width",20)
        .attr("height",20)
        .attr("xlink:href", pinButton)
        .attr("transform",
              `translate(-30,${height - (labelContainerHeight * 2) + 25})`)
        .attr("class","svgButton")
        .datum(data)
        .on("click", function(d) {
           t.props.onPinIndicator(d);
         });
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
DafnePlot.propTypes = {
  onDeleteIndicator  : PropTypes.func,
  onPinIndicator     : PropTypes.func,
  filteredIndicators : PropTypes.array,
  hiddenPathways     : PropTypes.array, //array of labels
  mode               : PropTypes.string,
  favouritedPathways : PropTypes.array

};


DafnePlot.defaultProps = {
  onDeleteIndicator  : (indicator) => {},
  onPinIndicator     : (indicator) => {},
  filteredIndicators : [],
  mode               : 'satisfaction',
  hiddenPathways     : [],
  favouritedPathways : []

};
export default DafnePlot;
