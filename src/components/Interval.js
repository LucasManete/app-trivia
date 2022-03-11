import React from 'react';
import { connect } from 'react-redux';
import { answerDisabled, nextBtn } from '../redux/actions';

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
    const { setDisabled, setNext } = this.props;
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
});
const mapDispatchToProps = (dispatch) => ({
  setDisabled: (state) => dispatch(answerDisabled(state)),
  setNext: (state) => dispatch(nextBtn(state)) });

export default connect(mapStateToProps, mapDispatchToProps)(Interval);
