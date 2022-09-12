import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends Component {
  state = {
    user: '',
    isLoading: false,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const name = await getUser();
    this.setState({ user: name.name, isLoading: false });
  }

  render() {
    const { user, isLoading } = this.state;
    return (
      isLoading ? <Loading /> : (
        <header data-testid="header-component">
          <nav>
            <h1 data-testid="header-user-name">
              Olá,&nbsp;
              { user }
              !
            </h1>
            <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
            <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
            <Link to="/profile" data-testid="link-to-profile">Meu Perfil</Link>
          </nav>
        </header>)
    );
  }
}

export default Header;
