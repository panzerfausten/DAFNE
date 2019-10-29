import React from 'react';
import "../style/style.scss";
import PropTypes from 'prop-types';
import IndicatorFilterListItem from '../components/IndicatorFilterListItem';

class IndicatorFilterList extends React.Component {
  constructor (props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(item,isSelected){
    this.props.onClick(item,isSelected);
  }
  render(){
    const indicators = this.props.indicators;
    let mappedFilteredIndicators = this.props.filteredIndicators.map(i => i.label);

    return (
      <div>
        {indicators.map((item,index) => {
            let isSelected = false;
            if(mappedFilteredIndicators.includes(item.label)){
              isSelected = true;
            }
            return(
              <IndicatorFilterListItem selected={isSelected} key={index} indicator={item} onClick={this.onClick}/>
            )
          }
        )}
      </div>
    );
  }
}

IndicatorFilterList.propTypes = {
  indicators         : PropTypes.array,
  filteredIndicators : PropTypes.array,
  onClick            : PropTypes.func
};

IndicatorFilterList.defaultProps = {
  indicators         : [],
  filteredIndicators : [],
  onClick            : () => {}
};

export default IndicatorFilterList;
