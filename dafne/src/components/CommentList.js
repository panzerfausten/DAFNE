import React from 'react';
import PropTypes from 'prop-types';
import CommentListItem from '../components/CommentListItem';

import "../style/style.scss";


class CommentList extends React.Component {
  constructor (props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(){
    this.props.onClick();
  }

  render(){
    const comments = this.props.comments;

    return (
      <div className='comments-list-area'>
        {comments.map((item,index) => {
            return(
              <CommentListItem key={index} comment={item} />
            )
          }
        )}
      </div>
    );
  }
}

CommentList.propTypes = {
  comments           : PropTypes.array,
  onClick            : PropTypes.func
};

CommentList.defaultProps = {
  comments           : [],
  onClick            : () => {}
};

export default CommentList;
