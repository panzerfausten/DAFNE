import React from 'react';
import PropTypes from 'prop-types';

import "../style/style.scss";


class TagCircleInitials extends React.Component {
  constructor (props) {
    super(props);
    this.getInitials = this.getInitials.bind(this);
  }

  getInitials(user){
    if(user.hasOwnProperty('name')){
      let initials = `${user.name[0]}`;

      if(user.hasOwnProperty('last_name')){
        initials = `${initials}${user.last_name[0]}`;
      }
      return initials.toUpperCase();
    }
    return '--'
  }

  render(){
    const user = this.props.user;

    return (
      <div className="tag-circle">
        {this.getInitials(user)}
      </div>
    );
  }
}

TagCircleInitials.propTypes = {
  user        : PropTypes.object,
};

TagCircleInitials.defaultProps = {
  user        : {},
};

export default TagCircleInitials;
