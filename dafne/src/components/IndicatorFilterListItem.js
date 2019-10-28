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

  onClick(indicator){
    this.handleOnSelect();
    this.props.onClick(indicator);
  }

  handleOnSelect(){
    let isSelected = this.state.isSelected;
    this.setState({isSelected:!isSelected});
  }

  render(){
    const indicator = this.props.indicator;
    let indicatorClass = classNames({
      'item_list': true,
      'item_selected': this.state.isSelected,
    });

    return (
      <div className={indicatorClass} onClick={() => this.onClick(indicator)}>
        <div>{indicator.name}</div>
      </div>
    );
  }
}

IndicatorFilterListItem.propTypes = {
  indicator      : PropTypes.object,
  onClick        : PropTypes.func
};

IndicatorFilterListItem.defaultProps = {
  indicators     : {},
  onClick        : () => {}
};

export default IndicatorFilterListItem;
