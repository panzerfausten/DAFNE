import React from 'react';
import "../style/style.scss";
import PropTypes from 'prop-types';

var classNames = require('classnames');

class IndicatorFilterListItem extends React.Component {
  constructor (props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(indicator){
    let selected = this.props.selected;
    this.props.onClick(indicator,!selected);
  }
  render(){
    const indicator = this.props.indicator;
    let indicatorClass = classNames({
      'item_list': true,
      'item_selected': this.props.selected,
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
