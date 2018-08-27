import React from 'react';
import PropTypes from 'prop-types';

export default class Async extends React.Component {
  static propTypes = {
    load: PropTypes.instanceOf(Promise).isRequired,
    loader: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    componentProps: PropTypes.object //eslint-disable-line
  };

  static defaultProps = {
    loader: null,
    error: null,
    componentProps: {},
  };

  state = {
    loading: true,
    Component: null,
    error: false,
  };

  componentWillMount() {
    console.log(typeof this.props.loader, typeof this.props.error);//eslint-disable-line
  }

  componentDidMount = () => {
    const { load } = this.props;
    load.then((c) => {
      this.setState({ loading: false, Component: c, error: false });
    }).catch(() => {
      this.setState({ loading: false, error: true });
    });
  };

  render = () => {
    const { Component, loading, error } = this.state;
    const { loader: Loader, componentProps, error: ErrorComponent } = this.props;

    if (!loading) {
      if (error && ErrorComponent) {
        return typeof ErrorComponent === 'string'
          ? ErrorComponent
          : <ErrorComponent />;
      }
      return Component && Component.default
        ? <Component.default {...componentProps} />
        : <Component {...componentProps} />;
    }
    if (loading) {
      return Loader && typeof Loader === 'string'
        ? Loader
        : <Loader />;
    }
    return null;
  };
}
