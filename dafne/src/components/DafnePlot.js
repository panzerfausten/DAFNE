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
    d3.selection.prototype.moveToFront = function() {
      return this.each(function(){
        this.parentNode.appendChild(this);
      });
    };
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
        let domain = funDirection === "minimize" ?  [0,1]: [1,0];
        scale = d3.scaleLinear()
          .domain(domain)
          .range([0,this.height - this.margin.bottom - this.margin.top]);
      }
      scales.push(scale);
    }
    //--------------------------------------------------------------------------
    function drawScale(_this,scale,indicator){
      _this.svg.append("g")
        .attr("transform", `translate(${x(_this.domain[i]) + 26}, 0)`)
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
        .x(function(d){ return x(d.domain)+20})
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
    let lines = data.very_short.split(" ");
    let maxlineLen = 15;
    let currentLen = 0;
    for(var _x = 0; _x < lines.length ; _x++){
      if(currentLen + lines[_x].length <= maxlineLen){
        currentLen += lines[_x].length;
      }else{
        //break it here
        break;
      }
    }
    //take the value of x
    let firstLine = lines.slice(0,_x).join(" ");
    let secondLine = lines.slice(_x).join(" ");
    svg.append("a")
      .attr("href",data.url)
      .attr("target","_blank")
      .on("mouseover", function () {
        d3.select(`#text_tooltip_${i}`).style('visibility','visible')
        d3.select(`#text_tooltip_${i}`).moveToFront();
      })
      .on("mouseout", function () {
        d3.select(`#text_tooltip_${i}`).style('visibility','hidden');
      })
      .append("text")
        .text(firstLine)
        .attr("x",x+20)
        .attr("text-anchor","middle")
        .style("font-size", "12px")
        .style("font-weight", "bold")
        .attr("transform",
              `translate(0,-${labelContainerHeight})`);
    svg.append("a")
      .attr("href",data.url)
      .attr("target","_blank")
      .append("text")
      .text(secondLine)
      .attr("x",x+20)
      .attr("text-anchor","middle")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .on("mouseover", function (d) {
        d3.select(`#text_tooltip_${i}`).style('visibility','visible')

      })
      .on("mouseout", function () {
        d3.select(`#text_tooltip_${i}`).style('visibility','hidden');
      })
      .attr("transform",
            `translate(0,-${labelContainerHeight-15})`);
  }
  drawAxis(t,svg,i,x,data){
    let width = 120;
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
            `translate(20,-18)`);
    let tooltip_g = svg.append("g")
      .style('visibility','hidden')
      .attr("x",x-20)
      .attr("transform",
            `translate(0,0)`)
      .attr("id",`text_tooltip_${i}`);
    let tooltip_rect = tooltip_g.append("rect")
      .attr("fill","black")
      .attr("width",1)
      .attr("height",20)
      .attr("x",x-20)


    let tooltip_text = tooltip_g.append("text")
      .text(data.long_description)
      .attr("x",x-20)
      .attr("fill","white")
      .attr("text-anchor","middle")
      .style("font-size", "14px")

    let text_width = tooltip_text.node().getComputedTextLength();
    tooltip_rect.attr("width",text_width + 10)
    tooltip_rect.attr("transform",`translate(-${(text_width / 2) + 5},-12)`)


    this.drawLabel(t,svg,i,x,data,labelContainerHeight);
    // add icons
    svg.append("svg:image")
       .attr("x",x)
       .attr("width",20)
       .attr("height",20)
       .attr("xlink:href", cancelButton)
       .attr("transform",
             `translate(55,${height - (labelContainerHeight * 2) + 25})`)
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
