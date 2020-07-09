import React from 'react';
import * as d3 from "d3";
import ReactResizeDetector from 'react-resize-detector';
import cancelButton from "../img/icons/cancel.png";
import pinButton from "../img/icons/pin.png";
import PropTypes from 'prop-types';
import Data from "../data/data.json";
const millify = require('millify');
function sectorToColor(sector){
    switch (sector.toLowerCase()) {
        case 'food':
            return '#7AC94322';
            break;
        case 'energy':
            return '#FFDE1722';
            break;
        case 'water-environment':
            return '#1B75BC24'
            break;
        default:
            return 'black';

    }
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
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
    this.generateDomain = this.generateDomain.bind(this);
    this.drawLabel = this.drawLabel.bind(this);
    this.state = {
      data: [],
      highlightedPathways: [],
      filteredIndicators: [],

    }
    // this.domain = ["A","B","C","D","E","F","G","H","I","J","I","K","L","M"];
    this.domain = [];
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
    this.clear();
    this.clear();
    this.domain = this.generateDomain();
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
    if(this.props.data.indicators.length === 0){
      plotIndicators = [];
    }
    //re-set the size
    // this.width  = this.svgW - this.margin.right - this.margin.left;
    let indicatorWidth = 120;
    this.width  = (this.props.data.indicators.length * indicatorWidth ) + 20;
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
        let domain = [1,0];
        scale = d3.scaleLinear()
          .domain(domain)
          .range([0,this.height - this.margin.bottom - this.margin.top]);
      }
      scales.push(scale);
    }
    //--------------------------------------------------------------------------
    function drawScale(_this,scale,indicator){
      _this.svg.append("g")
        .attr("transform", `translate(${x(_this.domain[i]) + 20}, 20)`)
        .call(
          d3.axisLeft(scale) //call the scale at position i
          .tickFormat(function (d) {
            if(option_showScales){
                return numberWithCommas(parseFloat(d).toFixed(2));//millify.default(d)
            }else{
              return "";
            }
          })
        )
        .selectAll("line")
            .attr("x2","-12")
            .attr("transform", `translate(0, 0)`)
    }
    //--------------------------------------------------------------------------
    let option_showScales = this.props.showScales;
    for (var i = 0; i < plotIndicators.length; i++) {
      let d = plotIndicators[i];
      this.drawAxis(this,this.svg,i,x(this.domain[i]),d);
      let funDirection = d.funDirection;
      drawScale(this,scales[i],plotIndicators[i]);
    }
    var xLeft = d3.scalePoint()
              .domain(this.domain)
              .range([-69,470]);

    let widthPerspA = x(this.domain[this.props.lenIndicatorsA]);
    let xCommon = widthPerspA;
    let widthCommon = x(this.domain[this.props.commonIndicators.length]);
    let txCommon = xCommon + (widthCommon / 2);
    if(this.props.showCommonIndicatorsOnly){
      xCommon    = 0;
      txCommon   = widthCommon / 2;
    }
    // if(this.props.lenIndicatorsA === 0 && this.props.lenIndicatorsB === 0
    //   && this.props.commonIndicators.length > 0){
    //   txCommon    = "50%";
    // }
    let widthPerspB =  x(this.domain[this.props.lenIndicatorsB]);
    let xPerspB = widthPerspA + widthCommon;

    //draw rectangles


    if(this.props.perspectiveA.hasOwnProperty("name") &&
        !this.props.showCommonIndicatorsOnly
        && this.props.lenIndicatorsA > 0
      ){
      let leftArea = this.svg.append('g')
        .attr("x",0)
        .attr("y",0)
        .attr("width",widthPerspA)
        .attr("height",this.height + 80)
        .attr("transform",
              "translate(-" + (this.margin.left - 15) + ",-" + this.margin.top + ")");
      leftArea.append("rect")
        .attr("x",0)
        .attr("y",0)
        .attr("width",widthPerspA)
        .attr("height",this.height + 80)
        .attr("fill","#f4e6cf")
      //label
      leftArea.append("text")
       .text(`Perspective 2: ${this.props.perspectiveA.name}`)
       .attr("x",widthPerspA / 2)
       .attr("y","92%")
       .attr("text-anchor","middle")
       .attr("dominant-baseline","middle")
       .style("font-size", "12px")
       .style("font-weight","bold")

    }
    if(this.props.commonIndicators.length > 0){
      let middleArea = this.svg.append('g')
       .attr("x",xCommon)
       .attr("y",0)
       .attr("width", "100%")
       .attr("height",this.height + 80)
       .attr("transform",
              "translate(-" + (this.margin.left - 15) + ",-" + this.margin.top + ")");
      middleArea.append("rect")
       .attr("x",xCommon)
       .attr("y",0)
       .attr("width", widthCommon)
       .attr("height",this.height + 80)
       .attr("fill","#BEDAF2")
     //label
     middleArea.append("text")
      .text("COMMON INDICATORS")
      .attr("x",txCommon)
      .attr("y","92%")
      .attr("text-anchor","middle")
      .attr("dominant-baseline","middle")
      .style("font-size", "12px")
      .style("font-weight","bold")
    }
    if(this.props.perspectiveB.hasOwnProperty("name")
        && !this.props.showCommonIndicatorsOnly
        && this.props.lenIndicatorsB > 0
      ){
      let rightArea = this.svg.append('g')
        .attr("x",xPerspB)
        .attr("y",0)
        .attr("width", widthPerspB)
        .attr("height",this.height + 80)
        .attr("transform",
                "translate(-" + (this.margin.left - 15) + ",-" + this.margin.top + ")");
      rightArea.append("rect")
        .attr("x",xPerspB)
        .attr("y",0)
        .attr("width", widthPerspB)
        .attr("height",this.height + 80)
        .attr("fill","#cee2e0")
      //label
      rightArea.append("text")
       .text(`Perspective 2: ${this.props.perspectiveB.name}`)
       .attr("x",xPerspB + (widthPerspB / 2))
       .attr("y","92%")
       .attr("text-anchor","middle")
       .attr("dominant-baseline","middle")
       .style("font-size", "12px")
       .style("font-weight","bold")

    }

    for (var i = 0; i < plotIndicators.length; i++) {
      let d = plotIndicators[i];
      this.drawAxis(this,this.svg,i,x(this.domain[i]),d);
      let funDirection = d.funDirection;
      drawScale(this,scales[i],plotIndicators[i]);
    }
    let mappedHighlightedPathways = this.state.highlightedPathways.map(p => p.name);

    for (var i = 0; i < lineData.length; i++) {
      let data = null;
      if(this.props.hiddenPathways.includes(i)){
        continue;
      }
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
      var line = d3.line()
        .x(function(d){ return x(d.domain)+20})
        .y(function(d){
          return scales[d.i](d.value)
        })
        .defined(function (d) {
          return d.value !== null;
        });
      if(scales.length > 0){
        let path =
        this.svg.append("path")
          .attr("d", line(data))
          .attr("stroke", lineData[i].color)
          .attr("stroke-width", lineWidth)
          .attr("fill", "none")
          .attr("transform", `translate(0, 21)`);
        if(this.props.favouritedPathways.includes(i)){
          path.style("stroke-dasharray", ("3, 3"))
        }
      }


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
        "value": pathwayData[i],
        "funDirection": Data.indicators[i].funDirection,
        "i":i

      }
      data.push(point);
    }
    return data;
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
        d3.selectAll(`.dtooltip`).style('visibility','hidden');
      })
      .append("text")
        .text(firstLine)
        .attr("x",x+20)
        .attr("text-anchor","middle")
        .style("font-size", "12px")
        .style("font-weight", "bold")
        .attr("transform",
              `translate(-5,-${labelContainerHeight-15})`);
    svg.append("a")
      .attr("href",data.url)
      .attr("target","_blank")
      .append("text")
      .text(secondLine)
      .attr("x",x+20)
      .attr("text-anchor","middle")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .on("mouseover", function () {
        d3.select(`#text_tooltip_${i}`).style('visibility','visible')
        d3.select(`#text_tooltip_${i}`).moveToFront();
      })
      .on("mouseout", function () {
        d3.selectAll(`.dtooltip`).style('visibility','hidden');
      })
      .attr("transform",
            `translate(-5,-${labelContainerHeight-30})`);

  }
  drawAxis(t,svg,i,x,data){
    let width = 110;
    let topOffset = -30;
    let height = t.svgH - this.margin.top - this.margin.bottom;
    let labelContainerHeight = this.margin.top +  (topOffset / 2);
    svg.append('g')
          .attr("transform",
                  `translate(0,${20})`)
          .append('rect')
            .attr("width",width)
            .attr("height",labelContainerHeight )
            .attr("x",x - 40)
            .attr("fill",sectorToColor(data.sector))
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
   if(this.props.mode !== 'satisfaction'){
     svg.append('g')
           .attr("transform",
                   `translate(0,${20})`)
           .append("text")
            .text(data.unit)
            .attr("x",x)
            .attr("text-anchor","middle")
            .style("font-size", "12px")
            .attr("transform",
                  `translate(15,-18)`);
    }
    let tooltip_g = svg.append("g")
      .attr('visibility','hidden')
      .attr("x",x-20)
      .attr("transform",
            `translate(0,0)`)
      .attr("id",`text_tooltip_${i}`)
      .attr("class","dtooltip")
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
