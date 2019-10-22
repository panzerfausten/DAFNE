import React from 'react';
import * as d3 from "d3";
import ReactResizeDetector from 'react-resize-detector';
class DafnePlot extends React.Component {
  constructor (props) {
    super(props);
    this.margin = {top: 70, right: 50, bottom: 30, left: 50};
    this.svgW   = 0;
    this.svgH   = 0;
    this.width  = 0;
    this.height = 0;
    this.svg    = null;
    this.renderPlot = this.renderPlot.bind(this);
    this.drawAxis = this.drawAxis.bind(this);
    this.convertPathwayDataToDomain = this.convertPathwayDataToDomain.bind(this);
    this.state = {
      data: []
    }
    this.domain = ["A","B","C","D","E","F","G","H"];

  }
  componentDidMount(){
    this.dafnePlot.addEventListener('resize', (event) => console.log(event.detail));
    this.setState({
      data:this.props.dafneData
    });
  }
  clear(){
    d3.select("svg").remove();
  }

  renderPlot(){
    this.clear();
    //re-set the size
    this.width  = this.svgW - this.margin.right - this.margin.left;
    this.height = this.svgH - this.margin.bottom - this.margin.top;
    // append the svg object to the body of the page
    this.svg = d3.select("#dafne_plot")
    .append("svg")
      .attr("width", this.svgW)
      .attr("height", this.svgH)
    .append("g")
      .attr("transform",
            "translate(" + this.margin.left + "," + this.margin.top + ")");
    //------------------------------------------------------------------------//

    // let _this = this;
    var x = d3.scalePoint()
              .domain(this.domain)
              .range([0,this.width]);
    var y = d3.scaleLinear()
              .domain([0,1])
              .range([0,this.height - this.margin.bottom - this.margin.top]);

    for (var i = 0; i < this.state.data.indicators.length; i++) {
      let d = this.state.data.indicators[i];
      this.drawAxis(this,this.svg,i,x(this.domain[i]),d);
      this.svg.append("g")
        .attr("transform", `translate(${x(this.domain[i]) + 6}, 0)`)
        .call(d3.axisLeft(y))
        .selectAll("line")
            .attr("x2","-12")
            .attr("transform", `translate(6, 0)`)
      // this.svg.append("circle")
      //     .attr("cx",x(this.domain[i]))
      //     .attr("cy",y(this.state.data[i]))
      //     .attr("r",8)
      //     .attr("transform", `translate(6, 0)`)
    }
    for (var i = 0; i < this.state.data.pathways.length; i++) {
      let data = this.convertPathwayDataToDomain(
          this.state.data.pathways[i].data
        );
      var line = d3.line()
        .x(function(d){ return x(d.domain)})
        .y(function(d){ return y(d.value)});
        this.svg.append("path")
          .attr("d", line(data))
          .attr("stroke", this.state.data.pathways[i].color)
          .attr("stroke-width", "2")
          .attr("fill", "none")
          .attr("transform", `translate(6, 0)`);
    }
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
  drawAxis(t,svg,i,x,data){
    let width = 80;
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
       .attr("height",height - labelContainerHeight )
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

    svg.append("text")
      .text(data.label)
      .attr("x",x)
      .attr("text-anchor","middle")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .attr("transform",
            `translate(0,-${labelContainerHeight})`);

  }
  onResize = (w,h) => {
    this.svgW = w;
    this.svgH = h;
    console.log("h",h);
    this.renderPlot();
  }
  render(){
    return (
      <div
        id="dafne_plot"
        ref={ref => this.dafnePlot = ref}>
        <ReactResizeDetector  handleWidth handleHeight onResize={this.onResize} />

      </div>
    )
  }
}
export default DafnePlot;
