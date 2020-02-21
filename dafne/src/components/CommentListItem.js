import React from 'react';
import PropTypes from 'prop-types';
import TagCircleInitials from '../components/TagCircleInitials';
import "../style/style.scss";
var moment = require('moment');


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
    const user = comment.user;
    let date = moment(comment.created_at).fromNow()
    return (
      <div className='comment-area m-b-10' onClick={() => this.onClick()}>
        <TagCircleInitials user={user}></TagCircleInitials>

        <div className='comment-wrapper'>
          <div className='comment-user-data  m-l-5'>
            <b>{`${user.name} ${user.last_name}`}</b>
            <span className={'comment-date m-l-5'}>{date}</span>
          </div>
          <div className='comment-text m-l-5'>
            {comment.comment}
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
