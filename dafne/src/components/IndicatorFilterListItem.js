import React from 'react';
import "../style/style.scss";
import PropTypes from 'prop-types';

var classNames = require('classnames');

class IndicatorFilterListItem extends React.Component {
  constructor (props) {
    super(props);
    this.state={
      isSelected:false,
    }
    this.onClick = this.onClick.bind(this);
    this.handleOnSelect = this.handleOnSelect.bind(this);
  }
  componentDidMount(){
    this.setState({
      isSelected:this.props.selected
    }, () => {
      if(!this.props.isSelected){
        this.onClick(this.props.indicator);
      }
    })
  }
  onClick(indicator){
    this.handleOnSelect(indicator);
  }
  handleOnSelect(indicator){
    let isSelected = this.state.isSelected;
    this.setState({isSelected:!isSelected}, () =>{
      this.props.onClick(indicator,!isSelected);
      }
    );
  }

  render(){
    const indicator = this.props.indicator;
    let indicatorClass = classNames({
      'item_list': true,
      'item_selected': this.state.isSelected,
    });

    return (
      <div className={indicatorClass} onClick={() => this.onClick(indicator)}>
        <div>{indicator.label}</div>
      </div>
    );
  }
}

IndicatorFilterListItem.propTypes = {
  indicator      : PropTypes.object,
  onClick        : PropTypes.func,
  selected       : PropTypes.bool
};

IndicatorFilterListItem.defaultProps = {
  indicators     : {},
  onClick        : (indicators,selected) => {},
  selected       : false

};

export default IndicatorFilterListItem;
