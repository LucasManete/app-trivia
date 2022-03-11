import React from 'react';

class Interval extends React.Component {
  state = {
    time: 30,
  }

  componentDidMount() {
    this.handleTime();
  }

  componentDidUpdate() {
    const { time } = this.state;
    if (time === 0) {
      clearInterval(this.myinterval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.myinterval);
  }

  handleTime = () => {
    const seconds = 1000;
    this.myinterval = setInterval(() => {
      this.setState((prevState) => ({
        time: prevState.time - 1,
      }));
    }, seconds);
  }

  render() {
    const { time } = this.state;
    return (
      <p>{time}</p>
    );
  }
}

export default Interval;
