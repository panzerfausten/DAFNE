import React from 'react';
import 'rc-checkbox/assets/index.css';
import Checkbox  from 'rc-checkbox';
import GraphA from "../img/icons/graph_a.png";
import GraphC from "../img/icons/graph_c.png";
import Info from "../img/icons/info.png";
import Data from "../data/data.json";
import Button from 'react-bootstrap/Button';

//components
import DafnePlot from "../components/DafnePlot";
import IndicatorTools from '../components/IndicatorTools';
import PathwaysList from '../components/PathwaysList';
import SavePerspectiveModal from '../components/SavePerspectiveModal';
import DafneApi from "../api/DafneApi"


class CreatePerspective extends React.Component {
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
      selectedPerspectiveIndex:-1
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
  }
  componentDidMount(){
    this.loadPerspectives();
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
 //  <div className='wrapper_select'>
 //    <span>Region</span>
 //    <select>
 //     <option>basin-wide</option>
 //    </select>
 //  </div>
 //  <div className='wrapper_select'>
 //    <span>Sector</span>
 //    <select>
 //     <option>All-sectors</option>
 //    </select>
 //  </div>
 // <div className='wrapper_select'>
 //    <span>Scenario</span>
 //    <select>
 //     <option>No extreme events</option>
 //    </select>
 //  </div>
  render(){
    return (
        <div className="flex">
          <div className="filters_area">
            <div className="filters_right_area">
               <div className="title m-b-5">Select Indicators in the indicator tool <span className="p-l-15">OR edit a saved perspective</span></div>
            </div>
            <div className="filters_left_area">
               <select className='custom-select blue-select' onChange={this.selectPerspective} value={this.selectedPerspectiveIndex}>
                <option>choose a perspective</option>
                {
                  this.state.perspectives.map((perspective,index) =>{
                    if(index === this.state.selectedPerspectiveIndex){
                      return (<option selected value={index}>{`${perspective.name} - ${perspective.owner.name} ${perspective.owner.last_name}`}</option>);
                    }else{
                      return (<option value={index}>{`${perspective.name} - ${perspective.owner.name} ${perspective.owner.last_name}`}</option>);
                    }
                  }
                  )
                }
               </select>
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
                <DafnePlot
                  ref={(dp) => { this.dafnePlot = dp; }}
                  onDeleteIndicator={(indicator) => {this.onDeleteIndicator(indicator);}}
                  onPinIndicator={(indicator) => this.onPinIndicator(indicator) }
                  data={Data}
                  showScales={this.state.dafnePlotOptions.showScales}
                  mode={this.state.dafnePlotOptions.mode}
                  ></DafnePlot>
                  <div className="save_area" style={{flex:1,marginBottom:10,maxHeight:30,marginRight:10,alignItems:"end",display:"flex",flexDirection:"column"}}>
                    <Button size="sm" onClick={() => this.handleOpenPerspectiveModal(true)} style={{width: 200}}>Save</Button>
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
export default CreatePerspective;
