import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { answerDisabled, nextBtn, setTime, stopTimer } from '../redux/actions';
import { saveLocalStorage } from '../services/localStorage';
import sound from '../assets/bip.mp3';
import 'react-circular-progressbar/dist/styles.css';
import '../pages/gamePage.css';

class Interval extends React.Component {
  state = {
    time: 30,
  }

  componentDidMount() {
    const audio = new Audio(sound);
    audio.play();
    const { stopTimerAction, setNext } = this.props;
    const interval = this.handleTime(audio);
    this.setState({
      interval,
      audio,
    });
    stopTimerAction(false);
    setNext(false);
  }

  componentDidUpdate() {
    const { time, audio } = this.state;
    const { setDisabled, setNext, setTimer } = this.props;
    saveLocalStorage('timer', time);
    setTimer(time);
    if (time === 0) {
      audio.pause();
      setDisabled(true);
      setNext(true);
    }
  }

  componentWillUnmount() {
    const { interval, audio } = this.state;
    clearInterval(interval);
    audio.pause();
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

  ToRender() {
    const { time, interval } = this.state;
    const { stop, restartTimeFunction } = this.props;
    return (
      <>
        <span
          className="timer"
        >
          <CircularProgressbar
            value={ time }
            maxValue={ 30 }
            text={ String(time) }
            background
            styles={ buildStyles({
              backgroundColor: 'white',
              pathColor: '#7816DE',
              textColor: 'black',
              trailColor: '#F58A27',
              textSize: '50px',
            }) }
          />
        </span>
        {stop === true ? clearInterval(interval) : null}
        {time === 0 ? restartTimeFunction(false) : null}
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
