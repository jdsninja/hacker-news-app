import PropTypes from 'prop-types';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';


function HotSwappingIntlProvider(props) {
  return (
    <IntlProvider {...props} defaultLocale="en-BE">
      {props.children}
    </IntlProvider>
  );
}

HotSwappingIntlProvider.propTypes = {
  children: PropTypes.element.isRequired,
  locale: PropTypes.string.isRequired,
  messages: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  // locale: state.locales.locale,
  // messages: state.locales.messages,
});

export default connect(mapStateToProps)(HotSwappingIntlProvider);
