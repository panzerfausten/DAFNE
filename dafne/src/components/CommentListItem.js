import React from 'react';
import PropTypes from 'prop-types';
import TagCircleInitials from '../components/TagCircleInitials';

import "../style/style.scss";


class CommentListItem extends React.Component {
  constructor (props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(){
    console.log('click');
  }

  render(){
    const comment = this.props.comment;
    const user = {name:'Darien', last_name:'Miranda'};

    return (
      <div className='comment-area m-b-10' onClick={() => this.onClick()}>
        <TagCircleInitials user={user}></TagCircleInitials>

        <div className='comment-wrapper'>
          <div className='comment-user-data'>
            Nombre
          </div>
          <div className='comment-text'>
            cometario
          </div>
        </div>
      </div>
    );
  }
}

CommentListItem.propTypes = {
  comment        : PropTypes.object,
  onClick        : PropTypes.func,
};

CommentListItem.defaultProps = {
  comment        : {},
  onClick        : () => {},
};

export default CommentListItem;
