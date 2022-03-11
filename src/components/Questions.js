import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './style.css';

class Questions extends React.Component {
  state = {
    next: false,
    questions: [],
    loading: true,
    index: 0,
    colorRed: '',
    colorGreen: '',
    disabled: false,
  }

  componentDidMount() {
    const { questions } = this.props;
    this.setState({ questions, loading: false });
  }

  getBollAnswers(quest) {
    const { colorGreen, colorRed, disabled } = this.state;
    const answers = [...quest.incorrect_answers, quest.correct_answer].sort();
    const incorrects = quest.incorrect_answers;
    return answers.map((answer) => {
      if (answer === incorrects[0]) {
        return (
          <button
            type="button"
            data-testid="wrong-answer-0"
            onClick={ this.handleColor }
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
          onClick={ this.handleColor }
          className={ colorRed }
          disabled={ disabled }
        >
          {answer}
        </button>);
    });
  }

  getMultipleAnswers(quest) {
    const { colorGreen, colorRed, disabled } = this.state;
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
            onClick={ this.handleColor }
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
          onClick={ this.handleColor }
          disabled={ disabled }
        >
          {answer}
        </button>
      );
    });
  }

handleColor = () => {
  this.setState({
    colorGreen: 'colorButtonCorrect',
    colorRed: 'colorButtonIncorrect',
    disabled: true,
    next: true,
  });
}

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

handleNextClick(index) {
  const { history } = this.props;
  const maxIndex = 4;
  if (index < maxIndex) {
    this.setState({
      index: index + 1,
      colorGreen: '',
      colorRed: '',
      disabled: false,
      next: false,
    });
  } else {
    // this.setState({ loading: true });
    history.push('/feedbak');
  }
}

renderNextBtn() {
  const { index } = this.state;
  return (
    <button
      type="button"
      data-testid="btn-next"
      onClick={ () => this.handleNextClick(index) }
    >
      Next
    </button>);
}

render() {
  const { loading, index, next } = this.state;
  return (
    <div>
      {loading ? (<span>Caregando...</span>) : this.questionToRender(index) }
      {next && this.renderNextBtn()}
    </div>
  );
}
}
Questions.propTypes = {
  questions: PropTypes.oneOfType([PropTypes.object]).isRequired,
  history: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  questions: state.player.questions,
});
export default connect(mapStateToProps, null)(Questions);
