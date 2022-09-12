import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <div data-testid="page-login">
        <input type="text" data-testid="login-name-input" />
        <button data-testid="login-submit-button" type="button">
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;