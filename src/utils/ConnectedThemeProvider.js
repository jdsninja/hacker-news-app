import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';

function ConnectedThemeProvider(props) {
  return <ThemeProvider theme={props.theme}>{props.children}</ThemeProvider>;
}

ConnectedThemeProvider.propTypes = {
  children: PropTypes.any,
  loadingTheme: PropTypes.bool,
  theme: PropTypes.object.isRequired,
};

const mapStateToProp = (state) => {
  // this overrides default theme values with state theme
  // thus if a prop is missing from state theme, the default theme prop is used

  const theme = {
  };

  return { theme };
};

export default connect(mapStateToProp)(ThemeProvider);
