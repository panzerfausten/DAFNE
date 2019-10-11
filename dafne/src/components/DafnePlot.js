import React from 'react';
import { Link } from "react-router-dom";
import {
        Nav,
        NavDropdown,
        Form,
        FormControl,
        Navbar,
        Button,
        Row,
        Col

} from 'react-bootstrap';
import * as d3 from "d3";
import ReactResizeDetector from 'react-resize-detector';
class DafnePlot extends React.Component {
  constructor (props) {
    super(props);
    this.margin = {top: 10, right: 50, bottom: 30, left: 50};
    this.svgW   = 0;
    this.svgH   = 0;
    this.width  = 0;
    this.height = 0;
    this.svg    = null;
    this.renderPlot = this.renderPlot.bind(this);
  }
  componentDidMount(){
    this.dafnePlot.addEventListener('resize', (event) => console.log(event.detail));

  }
  clear(){
    d3.select("svg").remove();
  }
  renderPlot(){
    this.clear();
    //re-set the size
    this.width  = this.svgW - 90;
    this.height = this.svgH;
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
    var data = [10,3];
    var x = d3.scalePoint()
              .domain(["A","B","C"])
              .range([0,this.width]);
    var y = d3.scaleLinear()
              .domain([0,10])
              .range([0,this.height]);
    this.svg.append("circle")
        .attr("cx",x("B"))
        .attr("cy",this.height - this.margin.bottom)
        .attr("r",8)
    this.svg.append("circle")
        .attr("cx",x("A"))
        .attr("cy",((this.height / 2) - this.margin.bottom))
        .attr("r",8)
    // var x = d3.scaleLinear()
    //   .domain([ 0 , 10 ])
    //   .range([ 0 , 10]);
    // // Add Y axis
    // var y = d3.scaleLinear()
    //   .domain([0, 10])
    //   .range([ this.height - this.margin.bottom, 0 ]);
    //
    // //draw axis
    // this.svg.append("g")
    //   .call(d3.axisLeft(y));
    this.svg.append("g")
      .attr("transform", `translate(${0}, 0)`)
      .call(d3.axisLeft(y));
    this.svg.append("g")
      .attr("transform", `translate(${this.width / 2 }, 0)`)
      .call(d3.axisLeft(y));
    // // draw the line
    // this.svg.append("path")
    //  .datum(data)
    //  .attr("fill", "none")
    //  .attr("stroke", "steelblue")
    //  .attr("stroke-width", 1.5)
    //  .attr("d", d3.line()
    //    .x(function(d) { return x(d) })
    //    .y(function(d) { return y(d) })
    //  )


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
