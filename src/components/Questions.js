import sanitizeHTML from 'sanitize-html';
import React from 'react';
import { connect } from 'react-redux';
import './questions.css';
import Interval from './Interval';
import { checkScore,
  propTypes, mapStateToProps, mapDispatchToProps } from '../services/helpers';

import { saveRankingStorage } from '../services/localStorage';

class Questions extends React.Component {
  state = {
    questions: [],
    loading: true,
    index: 0,
    renderTimer: true,
  }

  componentDidMount() {
    const { questions } = this.props;
    this.setState({ questions, loading: false });
  }

  getBollAnswers(quest) {
    const { disabled } = this.props;
    const answers = [...quest.incorrect_answers, quest.correct_answer].sort();
    const incorrects = quest.incorrect_answers;
    return answers.map((answer) => {
      if (answer === incorrects[0]) {
        return (
          <button
            type="button"
            key="1"
            data-testid="wrong-answer-0"
            onClick={ () => {
              this.handleAnswerClick('wrong');
            } }
            className="answerBtn"
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
            this.handleAnswerClick('rigth');
          } }
          className="btn_Answer"
          disabled={ disabled }
        >
          {answer}
        </button>);
    });
  }

  getMultipleAnswers(quest) {
    const { disabled } = this.props;
    const answers = [...quest.incorrect_answers, quest.correct_answer]
      .sort();
    const incorrects = quest.incorrect_answers;
    return answers.map((answer) => {
      if (answer === quest.correct_answer) {
        return (
          <button
            key="4"
            type="button"
            data-testid="correct-answer"
            onClick={ () => {
              this.handleAnswerClick('rigth');
            } }
            className="btn_Answer"
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
          className="answerBtn"
          onClick={ () => {
            this.handleAnswerClick('wrong');
          } }
          disabled={ disabled }
        >
          {answer}
        </button>
      );
    });
  }

callStopTimer = () => {
  const { stopTimerAction } = this.props;
  return stopTimerAction(true);
}

restartTimer = (value) => {
  this.setState({
    renderTimer: value,
  });
};

questionToRender() {
  const { questions, index } = this.state;
  const { history } = this.props;
  try {
    const { results } = questions;
    const quest = results[index];
    const { type, category, question } = quest;
    const clean = sanitizeHTML(question);
    const secondClean = sanitizeHTML(category);
    return (
      <>
        <p
          data-testid="question-category"
          dangerouslySetInnerHTML={ { __html: secondClean } }
        >
          {secondClean.category}
        </p>
        <p
          data-testid="question-text"
          dangerouslySetInnerHTML={ { __html: clean } }
        >
          {clean.question}
        </p>
        <div className="answers-div" data-testid="answer-options">
          {type === 'multiple'
            ? this.getMultipleAnswers(quest)
            : this.getBollAnswers(quest)}
        </div>
      </>
    );
  } catch (error) {
    history.push('/');
  }
}

callDisabledDispatch(value) {
  const { setDisabled } = this.props;
  return setDisabled(value);
}

callNextBtnDispatch(value) {
  const { setNext } = this.props;
  return setNext(value);
}

handleAnswerClick(answer) {
  const { index, questions } = this.state;
  const { score, assertions, countScoreAction, name, urlGravatar } = this.props;
  this.callStopTimer();
  this.callDisabledDispatch(true);
  this.callNextBtnDispatch(true);
  this.setState({
    renderTimer: false,
  });
  if (answer === 'rigth') {
    checkScore({ index,
      questions,
      score,
      assertions,
      countScoreAction,
      name,
      urlGravatar });
  }
}

handleNextClick(index) {
  const { history } = this.props;
  const maxIndex = 4;
  if (index < maxIndex) {
    this.setState({
      index: index + 1,
      renderTimer: true,
    });
    return this.callDisabledDispatch(false);
  }
  const { score, name, urlGravatar } = this.props;
  history.push('/feedback');
  saveRankingStorage({ name, score, picture: urlGravatar });
  return this.callDisabledDispatch(false);
}

renderNextBtn() {
  const { index } = this.state;
  return (
    <>
      <p>Respostas desabilitadas!</p>
      <button
        type="button"
        data-testid="btn-next"
        className="nextBtn"
        onClick={ () => { this.handleNextClick(index); } }
      >
        Next
      </button>
    </>
  );
}

render() {
  const { loading, index, renderTimer } = this.state;
  const { next } = this.props;
  return (
    <>
      <div className="timer-div">
        {renderTimer ? <Interval
          render={ renderTimer }
          restartTimeFunction={ this.restartTimer }
        />
          : null}
      </div>
      {loading ? (<span>Caregando...</span>) : this.questionToRender(index) }
      {next && this.renderNextBtn()}
    </>
  );
}
}
Questions.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(Questions);
