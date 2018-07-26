import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import get from 'lodash/get';
import * as actions from '../../actions';

class News extends Component {
  state = {
    activeStoryId: null,
  }

  componentWillMount = () => {
    this.props.getTopStoriesIds().then((response) => {
      this.getFirst10Items(response.payload.data).map((storyId) => {
        this.props.getStory(storyId);
      })
    })
  }

  getFirst10Items = (storiesIds = []) => {
    return storiesIds.slice(0, 10);
  }

  getTop10Stories = ({ topStoriesIds, stories }) => {
    let result = [];
    this.getFirst10Items(topStoriesIds).forEach((storyId) => {
      const story = stories.find(story => story.id === storyId);
      if (story) {
        result.push(story);
      }
    })
    return result;
  }

  getComments = ({ commentsIds = [], comments }) => {
    // Check if its not already there before making the call
    if (!comments.find(comment => comment.id === commentsIds)) {
      this.getFirst10Items(commentsIds).map((commentId) => {
        this.props.getComment(commentId);
      })
    }
  }

  toggleActiveNews = (storyId) => {
    this.setState({ activeStoryId: this.state.activeStoryId === storyId ? null : storyId });
  }

  showComment = (story) => {
    const { comments } = this.props;
    return comments.map((comment, index) => {
      if (comment.parent === story.id) {
        return <ul key={index}><li>{comment.text}</li></ul>;
      }
    })
  }

  onClick = (story) => {
    const { comments } = this.props;
    this.toggleActiveNews(story.id);
    this.getComments({ commentsIds: get(story, 'kids', []), comments });
  }

  render() {
    const { topStoriesIds, stories } = this.props;
    if (!topStoriesIds || !stories) {
      return null;
    }

    const top10Stories = this.getTop10Stories({ topStoriesIds, stories });
    return (
      <div>
        {top10Stories.map((story, index) => {
          return <div key={index}>
            <button onClick={() => this.onClick(story)}>{story.title}</button>
            {this.state.activeStoryId === story.id && this.showComment(story)}
          </div>;
        })}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getTopStoriesIds: data => dispatch(actions.getTopStoriesIds(data)),
  getStory: data => dispatch(actions.getStory(data)),
  getComment: id => dispatch(actions.getComment(id)),
});

const mapStateToProps = (state) => {
  return ({
    topStoriesIds: state.news.topStoriesIds,
    comments: state.news.comments,
    stories: state.news.stories,
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(compose(
  withRouter,
)(News));

