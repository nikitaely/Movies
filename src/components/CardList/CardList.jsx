import { Component } from "react";
import { Alert, Pagination, Spin } from "antd";
import { debounce } from "lodash";

import "./CardList.scss";
import FilmCard from "../FilmCard/FilmCard";
import Movies from "../../services/Movies";

export default class CardList extends Component {
  state = {
    films: [],
    loading: false,
    query: null,
    pages: 0,
    selected_page: 1,
    online: true,
    rated: false,
  };

  movies = new Movies("8472e12f3a245ca4d0e8128178d42d5d");
  searchdeb = debounce(
    (e) => {
      this.getPageFilms(e);
    },
    1000,
    {
      maxWait: Infinity,
    }
  );

  getPageFilms = (query, page = 1) => {
    if (!query) return this.setState({ films: [], query });
    this.setState({ films: [], loading: true, query, selected_page: page });
    this.searchFilms(query, page);
  };
  changePage = (page) => {
    this.getPageFilms(this.state.query, page);
  };
  componentDidMount() {
    this.movies.getGenres().catch(() => {
      this.setState({ online: false, loading: false });
    });
  }
  componentDidUpdate() {
    let { active, searchQuery } = this.props;

    if (searchQuery !== this.state.query) {
      if (!searchQuery) return this.setState({ films: [], query: "" });
      this.searchdeb(searchQuery);
    }
    if (active === this.state.active) return;

    if (active === "rated" && !this.state.rated) {
      let userFilms = JSON.parse(localStorage.getItem("ratedFilms")) || [];
      this.setState({
        films: [],
        rated: true,
        query: null,
        pages: 0,
        loading: true,
        active,
      });
      if (userFilms.length === 0)
        this.setState({ films: [], loading: false, active });
      userFilms.forEach(({ id }) => {
        this.getFilm(id).then((res) => {
          this.setState(({ films }) => {
            let filmsCopy = JSON.parse(JSON.stringify(films));
            filmsCopy.push(res);
            return { films: filmsCopy, loading: false, active };
          });
        });
      });
    } else if (active === "search" && this.state.rated) {
      this.setState({ films: [], rated: false, active });
    }
  }
  getImage(link, path) {
    return path
      ? link + path
      : "https://critics.io/img/movies/poster-placeholder.png";
  }

  async searchFilms(query, page) {
    try {
      let allGenres = await this.movies.getGenres();
      let films = await this.movies.searchMovie(query, page);
      if (films.results.length === 0) {
        this.setState({
          films: [],
          loading: false,
        });
      } else {
        this.setState({
          films: films.results.map((res) => {
            let genres = res.genre_ids.map((id) => {
              return allGenres["genres"].find((g) => g.id === id);
            });

            return {
              poster: this.getImage(this.movies.imgLink, res.poster_path),
              name: res.title,
              date: res.release_date,
              rate: res.vote_average.toFixed(1),
              description: res.overview,
              tags: genres,
              key: res.id,
              id: res.id,
            };
          }),

          loading: false,
          pages: films.total_pages,
          online: true,
        });
      }
    } catch (err) {
      this.setState({ online: false, loading: false });
    }
  }

  async getFilm(id) {
    return new Promise((rs) => {
      this.movies.getMovie(id).then((res) => {
        rs({
          poster: this.movies.imgLink + res.poster_path,
          name: res.title,
          date: res.release_date,
          rate: res.vote_average.toFixed(1),
          description: res.overview,
          tags: res.genres,
          key: res.id,
          id: res.id,
        });
      });
    });
  }

  render() {
    return (
      <div className="cards">
        <div className="card-list">
          {this.state.loading ? (
            <Spin className="spin" />
          ) : this.state.films.length ? (
            this.state.films.map((el) => {
              return (
                <FilmCard
                  key={el.key}
                  id={el.id}
                  poster={el.poster}
                  name={el.name}
                  date={el.date}
                  rate={el.rate}
                  description={el.description}
                  tags={el.tags}
                ></FilmCard>
              );
            })
          ) : this.state.query && this.state.online ? (
            <Alert
              message="Movies not found"
              type="error"
              className="alert"
              showIcon
            />
          ) : null}
        </div>
        {this.state.pages && this.state.query && this.state.online ? (
          <Pagination
            current={this.state.selected_page}
            showSizeChanger={false}
            defaultPageSize={1}
            total={this.state.pages}
            onChange={this.changePage}
            className={"pagination"}
          ></Pagination>
        ) : null}

        {!this.state.online ? (
          <Alert
            message="Network Error"
            type="error"
            className="alert"
            showIcon
          ></Alert>
        ) : null}
      </div>
    );
  }
}
