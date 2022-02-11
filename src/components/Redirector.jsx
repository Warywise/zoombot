/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

class Redirector extends React.Component {
  constructor() {
    super();
    this.anchor = React.createRef();
    this.canClick = true;
  }

  simulateClick = (condition) => {
    if (condition) {
      this.canClick = false;
      this.anchor.current.click();
    }
  }

  render() {
    const { redirect, url, meetings, setMeetings, time } = this.props;

    if (redirect) {
      const newMeetingsArray = [...meetings].filter((meet) => meet.time !== time);
      setMeetings(newMeetingsArray);
      // setCheckedMeetings([...checkedMeetings, { time, title, link }]);
    }

    return (
      <a
        href={ url }
        ref={ this.anchor }
        target="_blank"
        rel="noreferrer"
      >
        { redirect && this.simulateClick(this.canClick) }
      </a>);
  }
}

Redirector.propTypes = {
  redirect: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  meetings: PropTypes.arrayOf(PropTypes.any).isRequired,
  setMeetings: PropTypes.func.isRequired,
  time: PropTypes.string.isRequired,
};

export default Redirector;
