import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './questions.css';
import Interval from './Interval';
import { stopTimer, answerDisabled, nextBtn } from '../redux/actions';

class Questions extends React.Component {
  state = {
    questions: [],
    loading: true,
    index: 0,
    colorRed: '',
    colorGreen: '',
    renderTimer: true,
  }

  componentDidMount() {
    const { questions } = this.props;
    this.setState({ questions, loading: false });
  }

  getBollAnswers(quest) {
    const { colorGreen, colorRed } = this.state;
    const { disabled } = this.props;
    const answers = [...quest.incorrect_answers, quest.correct_answer].sort();
    const incorrects = quest.incorrect_answers;
    return answers.map((answer) => {
      if (answer === incorrects[0]) {
        return (
          <button
            type="button"
            data-testid="wrong-answer-0"
            onClick={ () => {
              this.handleAnswerClick();
            } }
            className={ colorGreen }
            disabled={ disabled }
          >
            {answer}
          </button>);
      }
      return (
        <button
          type="button"
          key="0"
          data-testid="correct-answer"
          onClick={ () => {
            this.handleAnswerClick();
          } }
          className={ colorRed }
          disabled={ disabled }
        >
          {answer}
        </button>);
    });
  }

  getMultipleAnswers(quest) {
    const { colorGreen, colorRed } = this.state;
    const { disabled } = this.props;
    // referencia do sort: https://www.delftstack.com/pt/howto/javascript/shuffle-array-javascript/#:~:text=Comecemos%20por%20implementar%20um%20algoritmo,pode%20ser%20positivo%20ou%20negativo.
    const maxRandom = 0.5;
    const answers = [...quest.incorrect_answers, quest.correct_answer]
      .sort(() => Math.random() - maxRandom);
    const incorrects = quest.incorrect_answers;
    return answers.map((answer) => {
      if (answer === quest.correct_answer) {
        return (
          <button
            key="4"
            type="button"
            data-testid="correct-answer"
            onClick={ () => {
              this.handleAnswerClick();
            } }
            className={ colorGreen }
            disabled={ disabled }
          >
            {answer}
          </button>);
      }
      const index = incorrects.indexOf(answer, [0]);

      return (
        <button
          type="button"
          key={ index }
          data-testid={ `wrong-answer-${index}` }
          className={ colorRed }
          onClick={ () => {
            this.handleAnswerClick();
          } }
          disabled={ disabled }
        >
          {answer}
        </button>
      );
    });
  }

handleColor = () => {
  const { stopTimerAction } = this.props;
  this.setState({
    colorGreen: 'colorButtonCorrect',
    colorRed: 'colorButtonIncorrect',
  });
  return stopTimerAction(true);
}

restartTimer = (value) => {
  this.setState({
    renderTimer: value,
  });
};

questionToRender() {
  const { questions, index } = this.state;
  const { results } = questions;
  const quest = results[index];
  const { type } = quest;

  return (
    <>
      <span data-testid="question-category">{quest.category}</span>
      <span data-testid="question-text">{quest.question}</span>
      <div className="answers-div" data-testid="answer-options">
        {type === 'multiple'
          ? this.getMultipleAnswers(quest)
          : this.getBollAnswers(quest)}
      </div>

    </>
  );
}

callDisabledDispatch(value) {
  const { setDisabled } = this.props;
  return setDisabled(value);
}

callNextBtnDispatch(value) {
  const { setNext } = this.props;
  return setNext(value);
}

handleAnswerClick() {
  this.handleColor();
  this.callDisabledDispatch(true);
  this.callNextBtnDispatch(true);
  this.setState({
    renderTimer: false,
  });
}

handleNextClick(index) {
  const { history } = this.props;
  const maxIndex = 4;
  if (index < maxIndex) {
    this.setState({
      index: index + 1,
      colorGreen: '',
      colorRed: '',
      renderTimer: true,
    });
    return this.callDisabledDispatch(false);
  }
  history.push('/feedbak');
}

renderNextBtn() {
  const { index } = this.state;
  return (
    <button
      type="button"
      data-testid="btn-next"
      onClick={ () => { this.handleNextClick(index); } }
    >
      Next
    </button>);
}

render() {
  const { loading, index, renderTimer } = this.state;
  const { next } = this.props;
  return (
    <div>
      {renderTimer ? <Interval
        render={ renderTimer }
        restartTimeFunction={ this.restartTimer }
      />
        : null}

      {loading ? (<span>Caregando...</span>) : this.questionToRender(index) }
      {next && this.renderNextBtn()}
    </div>
  );
}
}
Questions.propTypes = {
  questions: PropTypes.oneOfType([PropTypes.object]).isRequired,
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setDisabled: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  stopTimerAction: PropTypes.func.isRequired,
  setNext: PropTypes.func.isRequired,
  next: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  questions: state.player.questions,
  disabled: state.answer.disabled,
  next: state.answer.nextBtn,
});
const mapDispatchToProps = (dispatch) => ({
  stopTimerAction: (state) => dispatch(stopTimer(state)),
  setDisabled: (state) => dispatch(answerDisabled(state)),
  setNext: (state) => dispatch(nextBtn(state)) });

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
