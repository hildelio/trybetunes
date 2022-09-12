import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    album: {},
    musicas: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const musicas = await getMusics(id);
    this.setState({
      album: musicas[0],
      musicas: musicas.filter((e) => e.kind === 'song'),
    });
  }

  render() {
    const { album, musicas } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">{ album.artistName }</h2>
        <p data-testid="album-name">{ album.collectionName }</p>
        {musicas.map((item) => (
          <MusicCard
            key={ item.trackId }
            trackName={ item.trackName }
            trackId={ item.trackId }
            previewUrl={ item.previewUrl }
            track={ item }
          />)) }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
