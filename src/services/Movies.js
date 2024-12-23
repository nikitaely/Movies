export default class Movies {
  _apiLink = 'https://api.themoviedb.org/3';
  imgLink = 'https://image.tmdb.org/t/p/w500/';
  options = {
    method: 'GET',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NDcyZTEyZjNhMjQ1Y2E0ZDBlODEyODE3OGQ0MmQ1ZCIsIm5iZiI6MTczMjc4OTc3NC40NzEsInN1YiI6IjY3NDg0NjBlOTQyMTVkY2Q2ZDZiYjFkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-sTVBEfglf_uiTn5p4wVaM54qAm27DINdypS0FdV1VY',
    },
  };
  constructor(key) {
    this.apiKey = key;
  }
  async getMovie(id) {
    let movie = await fetch(`${this._apiLink}/movie/${id}?api_key=${this.apiKey}`, this.options);
    if (!movie.ok) throw new Error('Error Movie');
    let data = await movie.json();
    return data;
  }
  ///https://api.themoviedb.org/3/search/movie?api_key=33d7e35c3bfff3e6599b6fecc8aa070e&query=dig
  async searchMovie(query, page = 1) {
    
    let movies = await fetch(`${this._apiLink}/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`, this.options);
    if (!movies.ok) throw new Error('Error Search');
    let data = await movies.json();
    return data;
  }
  async getGenres() {
    if (!this.genres) this.genres = await (await fetch(`${this._apiLink}/genre/list?api_key=${this.apiKey}`, this.options)).json();
    return this.genres;
  }
}