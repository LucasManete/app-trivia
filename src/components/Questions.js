import React from 'react';
import { connect } from 'react-redux';

class Questions extends React.Component {
  state = {
    next: false,
    questions: [],
    loading: true,
    index: 0,
  }

  componentDidMount() {
    const { questions } = this.props;
    // const { results } = questions;
    // results.forEach((question, index) => {
    //   this.setState({ [index]: question });
    // });
    this.setState({ questions, loading: false });
  }

  getBollAnswers(quest) {

  }

  getMultipleAnswers(quest) {
    console.log(quest);
    const answers = [...quest.incorrect_answers, quest.correct_answer].sort();
    console.log(answers);
    // const answersSorted = answers.sort();
    // console.log(answersSorted);
    // console.log(answers);
    return (<div>lalalala</div>);
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
        <div className="answers-div">
          {type === 'multiple' ? this.getMultipleAnswers(quest) : this.getBollAnswers(quest)}
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
const mapStateToProps = (state) => ({
  questions: state.player.questions,
});
export default connect(mapStateToProps, null)(Questions);
