import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
// import { saveLocalStorage } from '../services/localStorage';
import logo from '../trivia.png';
import { fetchQuestionsApi } from '../redux/actions';

class Login extends React.Component {
    state = {
      email: '',
      userName: '',
    };

  validadeEmailAndUserName = () => {
    const { email, userName } = this.state;
    if (email.length > 0 && userName.length > 0) {
      return false;
    } return true;
  }

  handlePlayClick = async (fetchApiQuestions) => {
    const { email, userName } = this.state;
    const hasEmail = md5(email).toString();
    const gravatar = `https://www.gravatar.com/avatar/${hasEmail}`;
    return fetchApiQuestions({ gravatar, userName });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { history, fetchApiQuestions } = this.props;
    const { userName, email } = this.state;
    return (
      <div className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <h1>Login</h1>
        <form>
          <div className="">
            <input
              className="email-input"
              type="email"
              placeholder="Digite seu email"
              data-testid="input-gravatar-email"
              required
              onChange={ this.handleChange }
              value={ email }
              name="email"
            />
          </div>
          <div className="">
            <input
              id="UserName"
              className="name-input"
              type="text"
              placeholder="Digite seu nome"
              data-testid="input-player-name"
              required
              onChange={ this.handleChange }
              value={ userName }
              name="userName"
            />
          </div>
          <div className="btnLogin">
            <button
              data-testid="btn-play"
              className="btn-play"
              type="button"
              onClick={ async () => {
                await this.handlePlayClick(fetchApiQuestions);
                history.push('/gamePage');
              } }
              disabled={ this.validadeEmailAndUserName() }
            >
              Play
            </button>
          </div>
          <Link to="/settings">
            <button
              data-testid="btn-settings"
              className="btn-settings"
              type="button"
            >
              Configurações
            </button>
          </Link>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  fetchApiQuestions: (state) => dispatch(fetchQuestionsApi(state)) });

Login.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
  fetchApiQuestions: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
