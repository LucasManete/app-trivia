import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './style.css';

class Questions extends React.Component {
  state = {
    // next: false,
    questions: [],
    loading: true,
    index: 0,
    colorRed: '',
    colorGreen: '',
  }

  componentDidMount() {
    const { questions } = this.props;
    this.setState({ questions, loading: false });
  }

  getBollAnswers(quest) {
    const { colorGreen, colorRed } = this.state;
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
        >
          {answer}
        </button>);
    });
  }

  getMultipleAnswers(quest) {
    const { colorGreen, colorRed } = this.state;
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
  });
}

questionToRender(index) {
  const { questions } = this.state;
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

render() {
  const { loading, index } = this.state;
  return (
    <div>
      {loading ? (<span>Caregando...</span>) : this.questionToRender(index) }
    </div>
  );
}
}
Questions.propTypes = {
  questions: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
const mapStateToProps = (state) => ({
  questions: state.player.questions,
});
export default connect(mapStateToProps, null)(Questions);
