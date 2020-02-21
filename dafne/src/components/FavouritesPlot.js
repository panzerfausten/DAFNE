import React from 'react';
import * as d3 from "d3";
import ReactResizeDetector from 'react-resize-detector';
import cancelButton from "../img/icons/cancel.png";
import pinButton from "../img/icons/pin.png";
import PropTypes from 'prop-types';
import DafneApi from "../api/DafneApi"
import Data from "../data/data.json";
let _ = require('underscore');

class FavouritesPlot extends React.Component {
  constructor (props) {
    super(props);
    this.margin = {top: 35, right: 50, bottom: 30, left: 70};
    this.svgW   = 300;
    this.svgH   = 300;
    this.width  = 400;
    this.height = 400;
    this.svg    = null;
    this.renderPlot = this.renderPlot.bind(this);
    this.fetchData  = this.fetchData.bind(this);
    this.state = {
      data: [
        {
          "pathway":"P1",
          "value":10
        },
        {
          "pathway":"P2",
          "value":5
        },
        {
          "pathway":"P3",
          "value":1
        }
      ],
    }
  }
  fetchData(){
    let pathways_list = Data.pathways.map( p => p.name);
    let pathways_obj  = {};
    for (var i = 0; i < pathways_list.length; i++) {
      pathways_obj[pathways_list[i]] = 0;
    }
    DafneApi.getAllFavourites().then( (res) => {
      if(res.success){
        let favs = _.groupBy(res.favourites,'pathway_name')
        let fKeys = Object.keys(favs);
        for (var k = 0; k < fKeys.length; k++) {
          // array[i]
          if(pathways_obj.hasOwnProperty(fKeys[k])){
            //if the key is present, add the total count
            pathways_obj[fKeys[k]] = pathways_obj[fKeys[k]] + favs[fKeys[k]].length;
          }else{
            //else create it
            pathways_obj[fKeys[k]] = favs[fKeys[k]].length;
          }
        }
        //Build the data array
        let oKeys = Object.keys(pathways_obj);
        let arr_obj = [];
        for (var i = 0; i < oKeys.length; i++) {
          arr_obj.push({
              "pathway":oKeys[i],
              "value": pathways_obj[oKeys[i]],
              "color": Data.pathways[i].color
          })
        }
        this.setState({
          data:arr_obj
        })
        this.renderPlot();
      }
    });
  }
  componentDidMount(){
    this.fetchData();

  }
  clear(){
    d3.select("svg").remove();
  }
  renderPlot(){
    // append the svg object to the body of the page
    this.svg = d3.select("#favourites_plot")
                 .append("svg")
                  .attr("width", this.width)
                  .attr("height", this.height)
                 .append("g")
                  .attr("transform",
                        "translate(" + this.margin.left + "," + this.margin.top + ")");
    // X axis
    var x = d3.scaleBand()
      .range([ 0, this.width - this.margin.right - this.margin.left ])
      .domain(this.state.data.map(function(d) { return d.pathway; }))
      .padding(0.2);
    this.svg.append("g")
            .attr("transform", `translate(0,${this.height - this.margin.top - this.margin.bottom})`)
            .call(d3.axisBottom(x))
              .selectAll("text")
              .attr("transform", "translate(-10,0)rotate(-45)")
              .style("text-anchor", "end");
    // Add Y axis
    var y = d3.scaleLinear()
              .domain([0, 10])
              .range([ this.height - this.margin.top - this.margin.bottom, 0]);
    this.svg.append("g")
        .call(d3.axisLeft(y))
    // Bars
    let _this = this;
    this.svg.selectAll("mybar")
      .data(this.state.data)
      .enter()
      .append("rect")
        .attr("x", function(d) { return x(d.pathway); })
        .attr("y", function(d) { return y(d.value); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return _this.height - _this.margin.top - _this.margin.bottom - y(d.value); })
        .attr("fill", function(d){return d.color})
    // Add legend X
    let center = (this.width - this.margin.left - this.margin.right) / 2;
    this.svg.append("text")
            .attr("x",0)
            .attr("y",0)
            .text("Pathways")
            .attr("transform",`translate(${center},${this.height - this.margin.top - this.margin.bottom +  29})`)
            .attr("text-anchor","middle")
            .style("font-size", "11px")

    // Add legend Y
    let middle = (this.height - this.margin.top - this.margin.bottom) / 2;
    this.svg.append("text")
            .attr("x",0)
            .attr("y",0)
            .text("Number of distinct users who marked the pathway as favourite")
            .attr("transform",`translate(-30,${middle}),rotate(90)`)
            .attr("text-anchor","middle")
            .style("font-size", "11px")
  }
  render(){
    return(
      <div id="favourites_plot">
      </div>
    )
  }
}
FavouritesPlot.propTypes = {
};


FavouritesPlot.defaultProps = {
};
export default FavouritesPlot;
