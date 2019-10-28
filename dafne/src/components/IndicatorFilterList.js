import React from 'react';
import "../style/style.scss";
import PropTypes from 'prop-types';
import IndicatorFilterListItem from '../components/IndicatorFilterListItem';

class IndicatorFilterList extends React.Component {
  constructor (props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(item){
    this.props.onClick(item);
  }

  render(){
    const indicators = this.props.indicators;

    return (
      <div>
        {indicators.map((item,index) => (
          <IndicatorFilterListItem key={index} indicator={item} onClick={this.onClick}/>
        ))}
      </div>
    );
  }
}

IndicatorFilterList.propTypes = {
  indicators      : PropTypes.array,
  onClick         : PropTypes.func
};

IndicatorFilterList.defaultProps = {
  Indicators      : [],
  onClick         : () => {}
};

export default IndicatorFilterList;
