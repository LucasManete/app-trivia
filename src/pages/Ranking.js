import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLocalStorage } from '../services/localStorage';
import { resetScore } from '../redux/actions';
import './ranking.css';

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
        <h1 data-testid="ranking-title" className="ranking">Ranking</h1>
        <div>
          {
            ranking.map((item, indice) => (
              <div key="item.name" className="infoPlayer">
                <p
                  className="nameRanking"
                  data-testid={ `player-name-${indice}` }
                >
                  {item.name}
                </p>
                <p
                  className="scoreRanking"
                  data-testid={ `player-score-${indice}` }
                >
                  {item.score}
                </p>
                <img className="imgRanking" src={ item.picture } alt="Foto" />
              </div>
            ))
          }
        </div>
        <Link to="/">
          <button
            type="submit"
            data-testid="btn-go-home"
            onClick={ this.resetScoreFeedback }
            className="rankingButton"
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
