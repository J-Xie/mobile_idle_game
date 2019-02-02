import React from 'react';

export default (startPropsName, stopPropsName, ft, delay) => BaseComponent =>
  class extends React.Component {
    constructor(props) {
      super(props);

      this.startCountdown = () => {
        this.started = true;
        this.start();
      };

      this.start = () => {
        if (this.started !== true) {
          return;
        }

        if (this.timeout) {
          clearTimeout(this.timeout);
        }

        const date = Date.now();
        this.timeout = setTimeout(() => {
          ft(this.props, Date.now() - date, this.stopCountdown);
          this.start();
        }, delay);
      };

      this.stopCountdown = () => {
        this.started = false;
        if (this.timeout) {
          clearTimeout(this.timeout);
          delete this.timeout;
        }
      };
    }

    componentWillUnmount() {
      clearTimeout(this.timeout);
    }

    render() {
      const props = {
        [startPropsName]: this.startCountdown,
        [stopPropsName]: this.stopCountdown,
      };
      return <BaseComponent {...this.props} {...props} />;
    }
  };
