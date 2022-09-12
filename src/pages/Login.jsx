import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Loading from './Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  state = {
    user: '',
    isDisabled: true,
    isLoading: false,
    isRedirecting: false,
  };

  handleChange = (e) => {
    this.setState({
      user: e.target.value,
    }, this.updateIsDisabled);
  };

  updateIsDisabled = () => {
    const { user } = this.state;
    const userMin = 3;
    this.setState({
      isDisabled: user.length < userMin,
    });
  };

  handleButton = async () => {
    const { user } = this.state;
    this.setState({ isLoading: true });
    await createUser({ name: user });
    this.setState({ isRedirecting: true });
  };

  render() {
    const { isDisabled, isLoading, isRedirecting } = this.state;
    return (
      <Route exact path="/">
        {isLoading ? <Loading /> : (
          <div data-testid="page-login">
            <input
              type="text"
              data-testid="login-name-input"
              onChange={ this.handleChange }
            />
            <button
              disabled={ isDisabled }
              onClick={ this.handleButton }
              data-testid="login-submit-button"
              type="button"
            >
              Entrar
            </button>
      </div>
        )}
        {isRedirecting && <Redirect to="/search" />}
      </Route>
    );
  }
}

export default Login;