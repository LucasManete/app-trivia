import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { answerDisabled, nextBtn, setTime } from '../redux/actions';

class Interval extends React.Component {
  state = {
    time: 30,
  }

  componentDidMount() {
    const interval = this.handleTime();
    this.setState({
      interval,
    });
  }

  componentDidUpdate() {
    const { time } = this.state;
    const { setDisabled, setNext, setTimer, initialState } = this.props;
    if (initialState === true) {
      const interval = this.handleTime();
      clearInterval(interval);
    }
    setTimer(time);
    if (time === 0) {
      setDisabled(true);
      setNext(true);
    }
  }

  handleTime = () => {
    const seconds = 1000;
    const intervalId = setInterval(() => {
      this.setState((prevState) => ({
        time: prevState.time - 1,
      }));
    }, seconds);
    return intervalId;
  }

  checkTime() {
    const { interval } = this.state;
    const { setDisabled } = this.props;
    clearInterval(interval);
    return setDisabled(true);
  }

  render() {
    const { time, interval } = this.state;
    const { stop } = this.props;
    return (
      <>
        <p>{time}</p>
        {stop === true ? clearInterval(interval) : null}
        <span>
          {time === 0 ? clearInterval(interval) : null}
        </span>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  stop: state.timer.stop,
  // time: state.timer.time,
});
const mapDispatchToProps = (dispatch) => ({
  setDisabled: (state) => dispatch(answerDisabled(state)),
  setNext: (state) => dispatch(nextBtn(state)),
  setTimer: (state) => dispatch(setTime(state)),
});
const { bool, func } = PropTypes;
Interval.propTypes = {
  stop: bool.isRequired,
  setDisabled: func.isRequired,
  setNext: func.isRequired,
  setTimer: func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Interval);
