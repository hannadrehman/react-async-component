import React from 'react';
import PropTypes from 'prop-types';

export default class Async extends React.Component {
  static propTypes = {
    load: PropTypes.instanceOf(Promise).isRequired,
    loader: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    componentProps: PropTypes.object //eslint-disable-line
  };

  static defaultProps = {
    loader: null,
    componentProps: {},
  };

  state = {
    loading: true,
    Component: null,
  };

  componentDidMount = () => {
    const { load } = this.props;
    load.then((c) => {
      this.setState({ loading: false, Component: c });
    });
  };

  render = () => {
    const { Component, loading } = this.state;
    const { loader: Loader, componentProps } = this.props;
    if (!loading && Component) {
      return Component.default ? (
        <Component.default {...componentProps} />
      ) : (
        <Component {...componentProps} />
      );
    }
    if (loading && Loader) {
      return typeof Loader === 'string' ? Loader : <Loader />;
    }
    return null;
  };
}
