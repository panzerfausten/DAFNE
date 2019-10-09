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

class DafnePlot extends React.Component {
  constructor (props) {
    super(props);
    this.margin = {top: 30, right: 50, bottom: 10, left: 50};
    this.width  = 460 - this.margin.left - this.margin.right;
    this.hieght = 400 - this.margin.top - this.margin.bottom;
    this.svg    = null;
    this.renderPlot = this.renderPlot.bind(this);
  }
  componentDidMount(){
    this.renderPlot();
  }
  clear(){
    d3.select("g.parent").selectAll("*").remove();
  }
  renderPlot(){
    this.clear();
    //re-set the size
    this.width = this.dafnePlot.offsetWidth - 90;
    this.height = 500;
    // append the svg object to the body of the page
    this.svg = d3.select("#dafne_plot")
    .append("svg")
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + this.margin.left + "," + this.margin.top + ")");
    //------------------------------------------------------------------------//
    let _this = this;
    var data = [0,10];
    var xscale = d3.scaleLinear()
        .domain([0, d3.max(data)])
        .range([0, this.width - 100]);

    var yscale = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([this.height/2, 0]);
    var yscale2 = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([this.height/2, 0]);
    var x_axis = d3.axisBottom()
            .scale(xscale);

    var y_axis = d3.axisLeft()
            .scale(yscale);
    var y_axis2 = d3.axisLeft()
            .scale(yscale2);
    this.svg.append("g")
       .attr("transform", "translate(50, 10)")
       .call(y_axis);
     this.svg.append("g")
        .attr("transform", "translate(200, 10)")
        .call(y_axis2);
    var xAxisTranslate = this.height/2 + 10;


  }
  render(){
    return (
      <div
        id="dafne_plot"
        ref={ref => this.dafnePlot = ref}>
      </div>
    )
  }
}
export default DafnePlot;
