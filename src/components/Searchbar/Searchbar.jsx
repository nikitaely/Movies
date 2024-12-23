import { Component } from 'react';
import { Input } from 'antd';

import './Searchbar.scss';

export default class Searchbar extends Component {
  state = {
    rated: false,
  };

  render() {
    if (!this.state.rated)
      return <Input type="search" className="searchbar" onChange={this.props.search} placeholder="Type to search..." />;
  }
}
