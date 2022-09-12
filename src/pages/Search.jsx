import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    isDisabled: true,
    input: '',
    lastSearch: '',
    isLoading: false,
    foundArtist: false,
    albums: [],
  };

  handleChange = (e) => {
    this.setState({
      input: e.target.value,
      lastSearch: e.target.value,
    }, this.updateIsDisabled);
  };

  handleButton = async () => {
    const { input } = this.state;
    this.setState({ isLoading: true });
    const albums = await searchAlbumsAPI(input);
    this.setState({ isLoading: false, foundArtist: true });
    this.setState({
      input: '',
      albums,
    });
  };

  updateIsDisabled = () => {
    const { input } = this.state;
    const inputMin = 2;
    this.setState({
      isDisabled: input.length < inputMin,
    });
  };

  render() {
    const { isDisabled, input, isLoading, lastSearch, foundArtist, albums } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {isLoading ? <Loading />
          : (
            <div>
              <input
                type="text"
                placeholder="Pesquisar"
                data-testid="search-artist-input"
                onChange={ this.handleChange }
                value={ input }
              />
              <button
                disabled={ isDisabled }
                type="button"
                data-testid="search-artist-button"
                onClick={ this.handleButton }
              >
                🔎
              </button>
              { foundArtist === true
                ? (
                  <div>
                    <h2>
                      Resultado de álbuns de:&nbsp;
                      { lastSearch }
                    </h2>
                    <div>
                      { (albums.length > 0)
                        ? (albums.map((e) => (
                          <Link
                            key={ e.collectionId }
                            to={ `/album/${e.collectionId}` }
                            data-testid={ `link-to-album-${e.collectionId}` }
                          >
                            <ul>
                              <li>
                                <img src={ e.artworkUrl100 } alt={ e.collectionName } />
                              </li>
                              <li>
                                <h3>{ e.collectionName }</h3>
                              </li>
                              <li>
                                <p>{ e.artistName }</p>
                              </li>
                            </ul>
                          </Link>
                        ))) : <h2>Nenhum álbum foi encontrado</h2> }
                    </div>
                  </div>
                ) : null}
            </div>
          )}

      </div>
    );
  }
}

export default Search;
