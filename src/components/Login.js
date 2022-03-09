import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      UserName: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  // Validação email: https://www.webdevdrops.com/react-forms-validacao-react-hook-form/

  validadeEmailAndUserName = () => {
    const { email, UserName } = this.state;
    if (email.length > 0 && UserName.length > 0) {
      return false;
    } return true;
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { UserName, email } = this.state;
    return (
      <main className="">
        <div className="">
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
                value={ UserName }
                name="UserName"
              />
            </div>
            <div className="btnLogin">
              <button
                data-testid="btn-play"
                className="btn-play"
                type="submit"
                // onClick={ () => {
                //   saveDispatchEmail(email);
                //   // history.push('/carteira');
                // } }
                disabled={ this.validadeEmailAndUserName() }
              >
                Play
              </button>
            </div>

            <Link to="/settings">
              <button
                data-testid="btn-settings"
                className="btn-settings"
                type="submit"
                disabled={ this.validadeEmailAndUserName() }
              >
                Configurações
              </button>
            </Link>

          </form>
        </div>
      </main>
    );
  }
}

export default Login;
