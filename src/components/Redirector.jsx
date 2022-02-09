import React from 'react';
import PropTypes from 'prop-types';

class Redirector extends React.Component {
  constructor() {
    super();
    this.anchor = React.createRef();
  }

  simulateClick = () => {
    this.anchor.current.click();
  }

  render() {
    const { redirect, url } = this.props;
    return (
      <a
        href={ url }
        ref={ this.anchor }
        target="_blank"
        rel="noreferrer"
      >
        { redirect && this.simulateClick() }
        Click
      </a>);
  }
}

Redirector.propTypes = {
  redirect: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
};

export default Redirector;
