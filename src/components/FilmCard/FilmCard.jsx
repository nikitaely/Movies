import React, { Component } from 'react';
import { Card, Rate, Spin, Tag } from 'antd';
import { format } from 'date-fns';

import './FilmCard.scss';
import ColorRate from '../ColorRate';

const cardBody = {
  padding: 0,
  display: 'flex',
  flexDirection: 'row',
};

const spinStyle = {
  justifyContent: 'center',
  display: 'flex',
  alignItems: 'center',
  height: '100%',
};

export default class FilmCard extends Component {
  state = {
    starValue: 0,
    img: null,
  };

  setStarValue = (e) => {
    this.setState({ starValue: e });
    let { id: filmId } = this.props;
    let ratedFilms = JSON.parse(localStorage.getItem('ratedFilms')) || [];
    let film = ratedFilms.find((e) => e.id === filmId);
    if (e) {
      if (!film) ratedFilms.push({ id: filmId, rate: e });
      else film.rate = e;
    } else {
      if (film) ratedFilms.splice(ratedFilms.indexOf(film), 1);
    }
    localStorage.setItem('ratedFilms', JSON.stringify(ratedFilms));
  };

  render() {
    let { rate, name, date, description, poster, tags, id } = this.props;
    let film = (JSON.parse(localStorage.getItem('ratedFilms')) || []).find((e) => e.id === id);
    let image = new Image();
    image.src = poster;
    image.onload = () => {
      this.setState({ img: image });
    };

    const imageLoader = this.state.img ? <img src={poster} alt={name} /> : <Spin style={spinStyle} />;
    return (
      <Card className="card" bodyStyle={cardBody}>
        <div className="card__image">{imageLoader}</div>
        <div className="card__content">
          <div className="card__content__name">
            <h3 className="card__content__name--title">{name}</h3>
            <ColorRate rate={rate} />
          </div>
          <div className="card__content__date">
            <span>{date ? format(new Date(date), 'MMMM d, u') : 'none'}</span>
          </div>
          <div className="card__content__tags">
            {tags.map((el) => (
              <Tag key={el.id}>{el.name}</Tag>
            ))}
          </div>
          <p className="card__content__description">{description}</p>
          <Rate
            className="card__content__stars"
            value={this.state.starValue || (film ? film.rate : 0)}
            count={10}
            allowHalf
            allowClear
            onChange={this.setStarValue}
          />
        </div>
      </Card>
    );
  }
}
