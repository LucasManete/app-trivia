import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLocalStorage } from '../services/localStorage';
import { resetScore } from '../redux/actions';

class Ranking extends React.Component {
  resetScoreFeedback = () => {
    const { resetScoreAction } = this.props;
    resetScoreAction({ score: 0 });
  };

  render() {
    const ranking = getLocalStorage('ranking');
    ranking.sort((a, b) => {
      const NEGATIVE_ONE = -1;
      if (a.score > b.score) return NEGATIVE_ONE;
      if (a.score < b.score) return 1;
      return 0;
    });
    return (
      <div className="rankingPage">
        <h1 data-testid="ranking-title">Ranking</h1>
        {
          ranking.map((item, indice) => (
            <>
              <p data-testid={ `player-name-${indice}` }>{item.name}</p>
              <p data-testid={ `player-score-${indice}` }>{item.score}</p>
              <img src={ item.picture } alt="Foto" />
            </>
          ))
        }
        <Link to="/">
          <button
            type="submit"
            data-testid="btn-go-home"
            onClick={ this.resetScoreFeedback }
          >
            Play Again

          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  resetScoreAction: (score) => dispatch(resetScore(score)),
});
Ranking.propTypes = {
  resetScoreAction: PropTypes.func.isRequired,
};
export default connect(null, mapDispatchToProps)(Ranking);
