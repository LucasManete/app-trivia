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
          <table className="listRanking">
            <tr className="list">
              <th className="name">Nome</th>
              <th className="score">Score</th>
              <th className="avatar">Avatar</th>
            </tr>
            <div className="table">
              {
                ranking.map((item, indice) => (
                  <div key="item.name" className="infoPlayer">
                    <tr className="infoIndividual">
                      <th
                        className="nameRanking"
                        data-testid={ `player-name-${indice}` }
                      >
                        {item.name}
                      </th>
                      <th
                        className="scoreRanking"
                        data-testid={ `player-score-${indice}` }
                      >
                        {item.score}
                      </th>
                      <img className="imgRanking" src={ item.picture } alt="Foto" />
                    </tr>
                  </div>
                ))
              }
            </div>
          </table>
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
