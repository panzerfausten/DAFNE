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
    this.drawAxis = this.drawAxis.bind(this);

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
    this.height = this.svgH - this.margin.bottom;
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
    let domain = ["A","B","C","D","E","F"];
    var data = [9,1,2,3,2];
    var lineData = [
      {"name":"A","value":9},
      {"name":"B","value":1},
      {"name":"C","value":2},
      {"name":"D","value":3},
      {"name":"E","value":2},
    ]
    var x = d3.scalePoint()
              .domain(domain)
              .range([0,this.width]);
    var y = d3.scaleLinear()
              .domain([0,10])
              .range([0,this.height]);
              var line = d3.line()
              	.x(function(d){ return x(d.name)})
              	.y(function(d){ return y(d.value)});

                this.svg.append("path")
                	.attr("d", line(lineData))
                	.attr("stroke", "teal")
                	.attr("stroke-width", "2")
                	.attr("fill", "none");

    for (var i = 0; i < data.length; i++) {
      this.svg.append("circle")
          .attr("cx",x(domain[i]))
          .attr("cy",y(data[i]))
          .attr("r",8)
      this.svg.append("g")
        .attr("transform", `translate(${(this.width / data.length) * i }, 0)`)
        .call(d3.axisLeft(y));
      this.drawAxis();


    }

  }
  drawAxis(){
    // this.svg.append('rect').attrs({ x: 0, y: 0, width: 20, height: 80, fill: 'red' })
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
