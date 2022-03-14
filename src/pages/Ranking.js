import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  render() {
    return (
      <div className="rankingPage">
        <h1 data-testid="ranking-title">Ranking</h1>
        <Link to="/">
          <button type="submit" data-testid="btn-go-home">Play Again</button>
        </Link>
      </div>
    );
  }
}
export default Ranking;
