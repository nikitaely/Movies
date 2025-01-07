import React, { Component } from 'react';

import CardList from '../CardList';
import Header from '../Header/';
import Searchbar from '../Searchbar';
import './App.scss';

export default class App extends Component {
  state = {
    title: null,
    active: 'search',
    searchQuery: '',
  };

  setActive = (e) => {
    this.setState(() => {
      return { active: e };
    });
  };

  search = (e) => {
    this.setState({ searchQuery: e.target.value });
  };
  render() {
    return (
      <div className="app">
        <Header setActive={this.setActive} active={this.state.active}></Header>
        <Searchbar search={this.search} active={this.state.active}/>
        <CardList active={this.state.active} searchQuery={this.state.searchQuery} />
      </div>
    );
  }
}
