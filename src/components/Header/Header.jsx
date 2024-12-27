import React, { Component } from 'react';
import { Tabs } from 'antd';
import './Header.scss';

const items = [
  {
    label: 'Search',
    key: 'search',
    className: 'menu__item',
  },
  {
    label: 'Rated',
    key: 'rated',
    className: 'menu__item',
  },
];

export default class Header extends Component {
  render() {
    return (
      <header className="header">
        <Tabs
          onChange={this.props.setActive}
          className="menu"
          items={items}
          mode="horizontal"
          selectedkeys={this.props.active}
        ></Tabs>
      </header>
    );
  }
}

/* */