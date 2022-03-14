import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Ranking extends React.Component {
  state = {
    ranking: [],
  }

  render() {
    const { ranking } = this.state;
    return (
      <div className="rankingPage">
        <h1 data-testid="ranking-title">Ranking</h1>

        <div className="rankingList">
          {ranking.map((item) => (
            <>
              <img
                src={ `${item.imgGravatar}` }
                alt="userImage"
                data-testid="header-profile-picture"
              />
              <p data-testid={ `player-name-${item.index}` }>{ item.userName }</p>
              <p data-testid={ `player-score-${item.index}` }>{ item.score }</p>
            </>
          ))}
        </div>

        <Link to="/">
          <button type="submit" data-testid="btn-go-home">Play Again</button>
        </Link>
      </div>
    );
  }
}

export default connect()(Ranking);
