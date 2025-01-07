import { Component } from 'react';
import { Input } from 'antd';

import './Searchbar.scss';

export default class Searchbar extends Component {

  render() {
    if (this.props.active === 'search')
      return <Input type="search" className="searchbar" onChange={this.props.search} placeholder="Type to search..." />;
  }
}
