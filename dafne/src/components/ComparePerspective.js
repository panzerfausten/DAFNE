import React from 'react';
import 'rc-checkbox/assets/index.css';
import Checkbox  from 'rc-checkbox';
import GraphA from "../img/icons/graph_a.png";
import GraphC from "../img/icons/graph_c.png";
import Info from "../img/icons/info.png";
import Data from "../data/data.json";
import CompareData from "../data/compareData.json";

import Button from 'react-bootstrap/Button';

//components
import DafnePlotCompare from "../components/DafnePlotCompare";
import IndicatorTools from '../components/IndicatorTools';
import PathwaysList from '../components/PathwaysList';
import SavePerspectiveModal from '../components/SavePerspectiveModal';
import DafneApi from "../api/DafneApi"
import PerspectivePicker from "../components/PerspectivePicker";

class ComparePerspective extends React.Component {
  constructor(p){
    super(p);
    this.state = {
      filteredIndicators:[],
      dafnePlotOptions:{
        showScales:true
      },
      showModal:false,
      perspectives:[

      ],
      selectedPerspectiveIndex:-1,
      perspectiveA:{},
      perspectiveB:{},
      compareData:{...CompareData}
    }
    this.onDeleteIndicator            = this.onDeleteIndicator.bind(this);
    this.onPinIndicator               = this.onPinIndicator.bind(this);
    this.onSelectIndicators           = this.onSelectIndicators.bind(this);
    this.filteredIndicators           = [];
    this.onOptionChanged              = this.onOptionChanged.bind(this);
    this.handleOpenPerspectiveModal   = this.handleOpenPerspectiveModal.bind(this);
    this.loadPerspectives             = this.loadPerspectives.bind(this);
    this.selectPerspective            = this.selectPerspective.bind(this);
    this.selectPerspectiveFromPerspectiveId = this.selectPerspectiveFromPerspectiveId.bind(this);
    this.onPerspectiveSelected        = this.onPerspectiveSelected.bind(this);
    this.getOriginalValuesFromIndicator = this.getOriginalValuesFromIndicator.bind(this);
    this.filterData                     = this.filterData.bind(this);
    this.clear  = this.clear.bind(this);
  }
  componentDidMount(){
    this.loadPerspectives();
  }
  getOriginalValuesFromIndicator(indicatorLabel){
    let indicatorIndex  = -1;
    for (var i = 0; i < Data.indicators.length; i++) {
      let indicator = Data.indicators[i];
      if(indicator.label === indicatorLabel){
        indicatorIndex = i;
      }
    }
    let originalValues = [
    ];
    for (var p = 0; p < Data.pathways.length; p++) {
      if(indicatorLabel === null){
        originalValues.push({
          "data":null,
          "abs":null
        });
      }else{
        originalValues.push({
          "data":Data.pathways[p].data[indicatorIndex],
          "abs":Data.pathways[p].abs[indicatorIndex]
        });
      }

    }
    return originalValues;
  }
  selectPerspectiveFromPerspectiveId(perspectiveId){
    for (var i = 0; i < this.state.perspectives.length; i++) {
      if(this.state.perspectives[i].shortId === perspectiveId){
        this.setState({
          selectedPerspectiveIndex: i
        })
      }
    }
  }
  loadPerspectives(){
    DafneApi.getPerspectives().then( (res) => {
      if(res.success){
        this.setState({
          perspectives:res.perspectives
        },() => {
          if(this.props.perspectiveId != null){
            if(this.props.perspectiveId != undefined){
              DafneApi.getPerspective(this.props.perspectiveId).then( (res) => {
                if(res.success){
                  let fi    = JSON.parse(res.perspectives[0].filter);
                  fi        = JSON.parse(fi);
                  this.filteredIndicators = fi;
                  // this.indicatorTools.changeScales(res.perspectives[0].showScales);
                  this.setState({
                    filteredIndicators : fi,
                    dafnePlotOptions   : {
                      showScales       : res.perspectives[0].showScales,
                      mode             : res.perspectives[0].mode
                    }
                  }, () => {
                    this.dafnePlot.filterIndicators(this.filteredIndicators);
                  })
                }
              });
            }

          }

        });


      }
    });
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  onDeleteIndicator(indicator){
    this.filteredIndicators.push(indicator);
    this.dafnePlot.filterIndicators(this.filteredIndicators);
    this.setState({filteredIndicators:this.filteredIndicators});
  }
  onSelectIndicators(indicators){
    this.filteredIndicators = indicators;
    this.dafnePlot.filterIndicators(this.filteredIndicators);
    this.setState({filteredIndicators:indicators});
  }
  onPinIndicator(indicator){
    // alert(JSON.stringify(indicator));
  }
  onOptionChanged(option){
    this.setState(prevState => {
      let dafnePlotOptions = Object.assign({}, prevState.dafnePlotOptions);
      dafnePlotOptions[option.option] = option.value;
      return { dafnePlotOptions };
    }, () => {
      this.dafnePlot.filterIndicators(this.filteredIndicators);
    })
  }
  handleOpenPerspectiveModal(value){
    this.setState({showModal:value});
  }
  selectPerspective(event){
    let index = event.target.value;
    if(index  > 0){
      let fi    = JSON.parse(this.state.perspectives[index].filter);
      fi        = JSON.parse(fi);
      this.filteredIndicators = fi;

      this.setState({
        filteredIndicators : fi,
        dafnePlotOptions   : {
          showScales       : this.state.perspectives[index].showScales,
          mode             : this.state.perspectives[index].mode
        },
        selectedPerspectiveIndex:index
      }, () => {
        this.dafnePlot.filterIndicators(this.filteredIndicators);
      })
    }

  }
  // onPerspectiveASelectedx(perspective){
  //   //copy compare data
  //   let data = {...this.state.compareData};
  //   let filtersA     = [];
  //   try{
  //     filtersA       = JSON.parse(JSON.parse(perspective.filter));
  //   }catch(ex){
  //
  //   }
  //   let indicatorsA = filtersA.slice(0,3);
  //   let commonIndicators = [
  //     {
  //       "color":"gray",
  //       "label":"-",
  //       "unit":"-"
  //     },
  //     {
  //       "color":"gray",
  //       "label":"-",
  //       "unit":"-"
  //     },
  //     {
  //       "color":"gray",
  //       "label":"-",
  //       "unit":"-"
  //     }
  //   ];
  //
  //   data.indicators[0] = indicatorsA[0];
  //   data.indicators[1] = indicatorsA[1];
  //   data.indicators[2] = indicatorsA[2];
  //   // Calculate data
  //
  //   for (var i = 0; i < data.pathways.length; i++) {
  //     data.pathways[i][1] = this.getOriginalValuesFromIndicator(indicatorsA[1].label);
  //   }
  //   for (var i = 0; i < data.pathways.length; i++) {
  //     data.pathways[i][2] = this.getOriginalValuesFromIndicator(indicatorsA[2].label);
  //   }
  //   debugger;
  //   this.setState({
  //     perspectiveA:perspective,
  //     compareData:data
  //   }, () => {
  //     this.dafnePlot.renderPlot();
  //   });
  // }
  filterData(data,filters){
    let mFilters = filters.map(f => f.label);
    return data.indicators.filter( i => !mFilters.includes(i.label));
  }
  extractLabel(indicators,index){
    if(indicators.length -1 < index){
      return null
    }else{
      return indicators[index].label;
    }
  }
  clear(){
    let data = {...this.state.compareData};
    for (var i = 0; i < data.pathways.length; i++) {
      data.pathways[i].data = [];
      data.pathways[i].abs = [];

      // let d = data.pathways[i];
      // for (var j = 0; j < d.data.length; j++) {
        // data.pathways[i].data[j] = null;
        // data.pathways[i].abs[j] = null;
      // }
    }
    data.indicators = [];
    this.setState({
      compareData:data
    }, () => {
      this.dafnePlot.renderPlot();
    });
  }
  onPerspectiveSelected(perspective,side){
    if(side === "A"){
      let perspectiveA = perspective;
      let perspectiveB = this.state.perspectiveB;
      this.setState({
        perspectiveA:perspective,
      },
        this.loadPerspective
      );
    }else{
      let perspectiveA = this.state.perspectiveB;
      let perspectiveB = perspective;
      this.setState({
        perspectiveB:perspective
      },
        this.loadPerspective
      );
    }

  }
  loadPerspective(){
    let perspectiveA = this.state.perspectiveA;
    let perspectiveB = this.state.perspectiveB;
    if(perspectiveA === undefined || perspectiveB === undefined){
      // return this.clear();
    }else{
      this.clear();
    }
    //copy compare data
    let data = {...this.state.compareData};
    data.indicators = [];

    let filtersA     = [];
    try{
      filtersA       = JSON.parse(JSON.parse(perspectiveA.filter));
    }catch(ex){

    }
    let filtersB     = [];
    try{
      filtersB       = JSON.parse(JSON.parse(perspectiveB.filter));
    }catch(ex){

    }
    let indicatorsA = this.filterData({...Data},filtersA);
    let indicatorsB = this.filterData({...Data},filtersB);

    let commonIndicatorsOnly = true;
    if(!commonIndicatorsOnly){
      //create indicators
      data.indicators = indicatorsA;

      //FILL INDICATORS A --------------------------------------------------------
      for (var i = 0; i < indicatorsA.length; i++) {
        let labels = this.getOriginalValuesFromIndicator(indicatorsA[i].label);
          for (var l = 0; l < labels.length; l++) {
              data.pathways[l].data.push(labels[l].data);
              data.pathways[l].abs.push(labels[l].abs);
          }
      }
    }

    //CALCULATE COMMON INDICATORS-----------------------------------------------
    let commonIndicators = [];
    if(filtersB.hasOwnProperty("length") && filtersB.length > 0){
      for (var iA = 0; iA < indicatorsA.length; iA++) {
        for (var iB = 0; iB < indicatorsB.length; iB++) {
          if(indicatorsA[iA].label === indicatorsB[iB].label){
            //we found a common indicator, add it to the list
            commonIndicators.push(indicatorsB[iB]);
          }
        }
      }
      //add common indicators to data.indicators
      data.indicators = data.indicators.concat(commonIndicators);
      for (var iC = 0; iC < commonIndicators.length; iC++) {
        let labels = this.getOriginalValuesFromIndicator(commonIndicators[iC].label);
          for (var lC = 0; lC < labels.length; lC++) {
              data.pathways[lC].data.push(labels[lC].data);
              data.pathways[lC].abs.push(labels[lC].abs);
          }
      }
    }
    if(!commonIndicatorsOnly){
      //FILL INDICATORS B --------------------------------------------------------
      if(filtersB.hasOwnProperty("length") && filtersB.length > 0){
        data.indicators = data.indicators.concat(indicatorsB);

        for (var i = 0; i < indicatorsB.length; i++) {
          let labels = this.getOriginalValuesFromIndicator(indicatorsB[i].label);
            for (var l = 0; l < labels.length; l++) {
                data.pathways[l].data.push(labels[l].data);
                data.pathways[l].abs.push(labels[l].abs);
            }
        }
      }
    }




    this.setState({
      compareData:data
    }, () => {
      this.dafnePlot.renderPlot();
    });
  }
  onPerspectiveBSelected(perspective){
    if(perspective === undefined){
      return this.clear();
    }
    //copy compare data
    let data = {...this.state.compareData};
    let filtersB     = [];
    try{
      filtersB       = JSON.parse(JSON.parse(perspective.filter));
    }catch(ex){

    }

    filtersB = this.filterData({...Data},filtersB);
    let indicatorsB = filtersB.slice(0,3);


    let commonIndicators = [
      {
        "color":"gray",
        "label":"-",
        "unit":"-"
      },
      {
        "color":"gray",
        "label":"-",
        "unit":"-"
      },
      {
        "color":"gray",
        "label":"-",
        "unit":"-"
      }
    ];

    if(indicatorsB[0] !== undefined){
      data.indicators[6] = indicatorsB[0];
    }else{
      data.indicators[6] = commonIndicators[0];
    }
    if(indicatorsB[1] !== undefined){
      data.indicators[7] = indicatorsB[1];
    }else{
      data.indicators[7] = commonIndicators[0];
    }
    if(indicatorsB[2] !== undefined){
      data.indicators[8] = indicatorsB[2];
    }else{
      data.indicators[8] = commonIndicators[0];
    }

    let label_0 = this.getOriginalValuesFromIndicator(this.extractLabel(indicatorsB,0));
    let label_1 = this.getOriginalValuesFromIndicator(this.extractLabel(indicatorsB,1));
    let label_2 = this.getOriginalValuesFromIndicator(this.extractLabel(indicatorsB,2));

    for (var i = 0; i < label_0.length; i++) {
        data.pathways[i].data[6] = label_0[i].data;
        data.pathways[i].abs[6] = label_0[i].abs;
    }
    for (i = 0; i < label_1.length; i++) {
        data.pathways[i].data[7] = label_1[i].data;
        data.pathways[i].abs[7]  = label_1[i].abs;
    }
    for (i = 0; i < label_2.length; i++) {
        data.pathways[i].data[8] = label_2[i].data;
        data.pathways[i].abs[8]  = label_2[i].abs;
    }
    //calculate common indicators
    for (var i = 0; i < 3; i++) {
      let currentIndicator = data.indicators[i+6];
      let commonIndicatorI =
      {
        "color":"gray",
        "label":"-",
        "unit":"-"
      };
      let commonIndicatorFound = false;
      for (var j = 0; j < 3; j++) {
        if(currentIndicator.label === data.indicators[j].label){ //we found one
          commonIndicatorFound = true;
          commonIndicatorI = currentIndicator;
          //copy path data
          for (var x = 0; x < data.pathways.length; x++) {
            data.pathways[x].data[i+3] = data.pathways[x].data[i+6];
            data.pathways[x].abs[i+3] = data.pathways[x].abs[i+6];
          }
        }
      }
      data.indicators[i+3] = commonIndicatorI;
      if(!commonIndicatorFound){
        //reset data
        for (var xx = 0; xx < data.pathways.length; xx++) {
          data.pathways[xx].data[i+3] = null;
          data.pathways[xx].abs[i+3] = null;
        }
      }
    }

    this.setState({
      perspectiveB:perspective,
      compareData:data
    }, () => {

      this.dafnePlot.renderPlot();
    });

  }
  render(){
    return (
        <div className="flex">
          <div className="filters_area">
            <div className="filters_left_area">
               <div className="title m-b-5">Edit a shared perspective:</div>
            </div>
            <div className='filter_divider_area'></div>
            <div className="filters_right_area" >
               <div className="title m-b-5">Create a shared perspective by choosing two saved perspectives to compare:</div>
               <div className="filters_right_area_content justify-evenly">
                 <div className='wrapper_select'>
                   <PerspectivePicker perspectives={this.state.perspectives} onPerspectiveSelected={(p) => {
                     this.onPerspectiveSelected(p,"A");
                   }}></PerspectivePicker>
                 </div>
                 <div className='wrapper_select'>
                   <PerspectivePicker perspectives={this.state.perspectives} onPerspectiveSelected={(p) => {
                     this.onPerspectiveSelected(p,"B");
                   }}></PerspectivePicker>
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
                <div className="widget_content" style={{overflowY: "auto"}}>
                  <div className="solution_list_title">Solution pathways and their impact on the selected indicators:</div>
                  <PathwaysList data={Data} onClick={(p) => {this.dafnePlot.highlightPathways([p])}}></PathwaysList>
                </div>
              </div>
              <div className="widget" >
                <IndicatorTools
                  ref={(it) => { this.indicatorTools = it; }}
                  data={Data}
                  filteredIndicators={this.state.filteredIndicators}
                  onSelectIndicators={(indicators) => {this.onSelectIndicators(indicators);}}
                  onOptionChanged={(option) => {this.onOptionChanged(option)}}
                  ></IndicatorTools>
                <div className="widget" style={{backgroundColor:"white !important"}}>
                  <DafnePlotCompare
                    ref={(dp) => { this.dafnePlot = dp; }}
                    onDeleteIndicator={(indicator) => {this.onDeleteIndicator(indicator);}}
                    onPinIndicator={(indicator) => this.onPinIndicator(indicator) }
                    data={this.state.compareData}
                    showScales={this.state.dafnePlotOptions.showScales}
                    mode={this.state.dafnePlotOptions.mode}
                    perspectiveA={this.state.perspectiveA}
                    perspectiveB={this.state.perspectiveB}
                    >
                  </DafnePlotCompare>
                  <div className="save_area" style={{flex:1,marginBottom:10,maxHeight:30,marginRight:10,alignItems:"end",display:"flex",flexDirection:"column"}}>
                    <Button size="sm" onClick={() => this.handleOpenPerspectiveModal(true)} style={{width: 200}}>Save</Button>
                  </div>

                </div>
              </div>

          </div>
          <SavePerspectiveModal filter={this.state.filteredIndicators}
                                mode={this.state.dafnePlotOptions.mode}
                                showScales={this.state.dafnePlotOptions.showScales}
                                show={this.state.showModal}
                                handleOpenModal={this.handleOpenPerspectiveModal}
                                onSave={(res) => this.loadPerspectives()}
                                />
        </div>
    )
  }

}
//
//
export default ComparePerspective;
