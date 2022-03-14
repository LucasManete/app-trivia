import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { answerDisabled, nextBtn, setTime, stopTimer } from '../redux/actions';

class Interval extends React.Component {
  state = {
    time: 30,
  }

  componentDidMount() {
    const { stopTimerAction, setNext } = this.props;
    console.log('montei');
    const interval = this.handleTime();
    console.log(interval, 'componente didi mount');
    this.setState({
      interval,
    });
    stopTimerAction(false);
    setNext(false);
  }

  componentDidUpdate() {
    const { time } = this.state;
    const { setDisabled, setNext, setTimer } = this.props;
    setTimer(time);
    if (time === 0) {
      setDisabled(true);
      setNext(true);
    }
  }

  componentWillUnmount() {
    const { interval } = this.state;
    clearInterval(interval);
  }

  handleTime = () => {
    console.log('handleTime foi chamado');
    const seconds = 1000;
    const intervalId = setInterval(() => {
      console.log('timer esta acontecendo');
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

  ToRender() {
    const { time, interval } = this.state;
    const { stop, restartTimeFunction } = this.props;
    return (
      <>
        <p>{time}</p>
        {stop === true ? clearInterval(interval) : null}
        <span>
          {time === 0 ? restartTimeFunction(false) : null}
        </span>
      </>
    );
  }

  render() {
    return (
      <div>
        {this.ToRender()}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  stop: state.timer.stop,
});
const mapDispatchToProps = (dispatch) => ({
  setDisabled: (state) => dispatch(answerDisabled(state)),
  setNext: (state) => dispatch(nextBtn(state)),
  setTimer: (state) => dispatch(setTime(state)),
  stopTimerAction: (state) => dispatch(stopTimer(state)),
});
const { bool, func } = PropTypes;
Interval.propTypes = {
  stop: bool.isRequired,
  setDisabled: func.isRequired,
  setNext: func.isRequired,
  setTimer: func.isRequired,
  restartTimeFunction: func.isRequired,
  stopTimerAction: func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Interval);
