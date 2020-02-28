import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import EyeOn from "../img/icons/eye_on.png";
import Pathway from "../img/pathway.png";
import CancelButton from "../img/icons/cancel.png";
import Info from "../img/icons/info.png";
import Create_Compare from "../img/create_compare_perspective.png";


import "../style/style.scss";


class HelpModal extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      show:false,
    }
    this.handleOpenModal = this.handleOpenModal.bind(this);
  }

  handleOpenModal(value){
    this.setState({ show:value });
  }

  renderContent(){
    switch (this.props.type) {
      case 'header': return this.renderHender();
      case 'create_perspective': return this.renderCreatePerspective();
      case 'compare_perspective': return this.renderComparePerspective();
      case 'indicator_tools': return this.renderIndicatorTools();
      case 'pathway_tools': return this.renderPathwayTools();
      default: return null;
    }
  }

  renderHender(){
    return(
      <div className='custom_modal_content'>
        <p className='wrapper_description'>
          The multi-perspective visual analysis tool has two main views:
          “Create Your Perspective” and “Compare perspectives” which are accessible from the menu.<br/>
          There are two ways to use this tool.
          Normally you start with creating your perspective(s) first and then comparing them (Option 1),
          however if you want to explore the existing perspectives, you can go directly to comparison mode (Option 2).
          In the figure below we summarize the main functionalities of the tool that we describe in detail below.
        </p>
        <img className='m-t-20' src={Create_Compare}></img>

      </div>
    )
  }

  renderCreatePerspective(){
    return(
      <div className='custom_modal_content'>
        <p className='wrapper_description'>
         The main purpose of the create your perspective mode is to allow the
         stakeholders to create the perspective of their sector by selecting
         the indicators that are most interesting to them and exploring the
         impact of the selecting pathways. </p>
        <p className='wrapper_description'>
          - Create a new perspective or edit a saved one - <br/>
          Here you can edit a saved perspective by selecting it from the dropdown
          menu on the right-hand side. Once selected, the saved perspective is loaded below.
          You can also create a completely new perspective by selecting the indicators
          impact on which you would like to explore by clicking the button “Select Indicators”
          in the section “Indicator tools”.
          You can save your perspective by clicking on “Save perspective” at the bottom of the screen.
          Saving a perspective is necessary if you intend to compare it later in the “Compare perspectives” mode.
          Please give your perspective an intuitive name. Once you change a saved perspective
          (e.g. add or delete several indicators), you need to save it as a new perspective.
        </p>
      </div>
    )
  }

  renderIndicatorTools(){
    return(
      <div className='custom_modal_content'>
        <p className='wrapper_description'>
         In the indicator tools, you can select indicators the impact on which
         you would like to explore, as well as customize your view regarding
         the way in which the indicators are presented.</p>
        <p className='wrapper_description'>
        <div className="it_area_b">
           <div className="circular_button m-b-10" style={{paddingLeft:1,paddingBottom:1}}onClick={() => {}}>+</div>
           Add indicator
         </div>
         When you click on “Add indicators”, a new popup screen appears showing the available indicators. You can pre-filter them
         by region and by sector. Click on the indicators to select or deselect
         them and then once you are satisfied with your selection, click “OK”.
         The section below then shows the impact of pathways (on the left) on
         the set of indicators you selected.
         You can choose as many indicators as you like, but be aware that you can
         only view 7 of them on the screen at the time (depending on the size of
         your screen, this number can be higher or lower).
         To view all indicators, you can use the scroll bar on the bottom.
         You can also use the <img src={CancelButton} width={20} height={20}></img> sign, if you want to remove an
         indicator from the graph.</p>
        <p className='wrapper_description'>
         It is advised not to add too many indicators at a time, as then it becomes
         hard to compare the impact of pathways on them. If you want to explore
         more indicators, you can always save two different perspectives each
         having a distinct set of indicators, and then compare them in the
         “compare perspective” mode. </p>
        <p className='wrapper_description'>
          Indicators in absolute and satisfaction values<br/>
          You can view the indicators both in absolute and in satisfaction values
          (by using the toggle switch).
          Absolute values are the values that the indicators were actually measured on,
          whereas satisfaction values are normalized absolute values on the scale from 0 to 1.
          Specifically, the satisfaction value of 1 would be the value that would
          offer the highest satisfaction with the performance of the pathway on the indicator,
          whereas the value 0 – the lowest possible satisfaction.
          This transformation is necessary because some of the indicators are
          expressed as a maximization function (the higher value, the better satisfaction),
          whereas others as a minimization function (the lower value, the better satisfaction).
          Please note so that to make the understanding of the graphs easier,
          both in absolute and in satisfaction values the better satisfaction is
          always on top, whereas the worse satisfaction always on the bottom.
          You can also decide whether you want to view scale points for the indicators
          or not by toggling the “show scales” option.
        </p>
      </div>
    )
  }

  renderPathwayTools(){
    return(
      <div className='custom_modal_content'>
        <p className='wrapper_description'>
          Pathway tools <br />
          In the pathway tools, you can view the details about each pathway,
          provide comments to the pathway, save the pathway to favourites,
          as well as view the saved favourite pathways as well as all other user’s favourites.
        </p>
        <p className='wrapper_description'>
          A pathway is defined as a combination of various actions in a temporal
          sequence.
          Actions can be structural and non-structural. Structural actions refer
          to those that entail some structural modification of a system
          (e.g. construction of a new dam or irrigation system), whereas non-structural
          actions refer to managing the system in various ways depending on the specifications
          of the model.
          <br/>
            <img src={Pathway} style={{margin:10,backgroundColor:'white'}}></img>
          <br/>
          Each pathway has its own unique colour assigned to it. When you move
          your mouse over a pathway in the list, its indicator value line is
          highlighted in the visualization on the right-hand side making it easier
          to identify the single indicator values of the selected solution pathway.
        </p>
        <p className='wrapper_description'>
          When you click on the pathway in the list, it is highlighted in its
          assigned colour and a brief description of the pathway regarding its
          structural components is provided. As the pathway is quite a difficult
          concept that can only be understood by analysing all elements that
          comprise the model based on which it was estimated, more details can
          be viewed in the Geoportal. Here one can provide a comment about this
          pathway or view comments of other users. In addition, here you can add
          this pathway to your favourites by clicking on “Mark as favourite” and
          the face starts smiling. The pathway is then marked as a dashed line.
          You can unselect pathway from favourites by clicking on the face again.
          By default, you can view all pathways for which the indicator values
          are provided. If you want to filter out some pathways, because you are
          not interested in them, on the left-hand side, you can click on the eye icon
          <img src={EyeOn} style={{marginLeft:10,marginRight:10,backgroundColor:'white'}} className="eye"></img>

          to make it invisible.
          Please note that only the visible pathways are saved when you save your perspective.
        </p>
        <p className='wrapper_description'>
          To provide a comment, simply type it in the appropriate box.
          Please note that your comments can be viewed by all users of the tool.
        </p>
        <p className='wrapper_description'>
          Favourite pathways <br/>
          If the “show favourite pathways” is activated, the pathways which were
          favorited in this session are shown as dashed line on the graph.
          There is an additional functionality to view all the pathways which
          were favorited by all users of the tool. You can access this function
          by clicking “all users favourites”. You can view the pathways which
          were saved to favourites are shown in a simple graph where the height
          of the bar represents the number of users who saved this pathway to favourites.
        </p>
      </div>
    )
  }

  renderComparePerspective(){
    return(
      <div className='custom_modal_content'>
        <p className='wrapper_description'>
          The main purpose of the “compare perspectives” mode is to compare a
          perspective of a single sector to another perspective
          (of a different sector or stakeholder), by exploring the impact of the
          preferred pathways for one sector on the indicators that are important
          for the other sector or stakeholder. </p>
        <p className='wrapper_description'>
          - Choose two perspectives – <br/>
          To use this mode, you need to choose two perspectives from the available list.
          You can choose the perspectives you saved in the mode “Create your perspective”
          and compare them to each other.
          Alternatively, you can compare your perspective to the perspective saved
          by someone else to widen your view and to see how your preferred pathway
          performs on indicators which are relevant for another stakeholder or sector.
          To compare two perspectives, just select one each in the dropdown
          menus on the top.
          The dropdown menus list all perspectives available in the tool
          (the pre-selected perspectives and perspectives which other users have saved).
          Once two perspectives are selected, a common graph is generated below.
          The graph has three main sections: Common indicators – those indicators
          which were selected in both perspectives; and then two sections relating
          to the indicators which were solely chosen in the perspectives which were retrieved.
          In total, one can view a total of 12 indicators on the screen at the time.
          Once loaded, one can add a new indicator from the list or remove the
          indicators which are no longer interesting.
        </p>
        <p className='wrapper_description'>
          In this mode, you can also save the new “shared” perspective similarly
          as in the “create your perspective” mode.
        </p>
      </div>
    )
  }

  render(){
    return (
      <div>
        <img src={Info} style={{height:25,cursor:'pointer'}} onClick={() => this.handleOpenModal(true)}></img>
        <Modal className='custom_modal'
               size="lg"
               show={this.state.show}
               onHide={() => this.handleOpenModal(false)}
               centered>
          <Modal.Header closeButton className="custom_modal_header">
            <Modal.Title>Help</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.renderContent()}
          </Modal.Body>

        </Modal>
      </div>
    );
  }
}

HelpModal.propTypes = {
  type        : PropTypes.oneOf(['header', 'create_perspective' , 'indicator_tools', 'pathway_tools', 'compare_perspective']),
};

HelpModal.defaultProps = {
  type        : 'header',
};

export default HelpModal;
