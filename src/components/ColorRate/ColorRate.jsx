import { Component } from 'react';

import './ColorRate.scss';

export default class ColorRate extends Component {
  render() {
    let { rate } = this.props;
    let color = rate > 7 ? '#66E900' : rate >= 5 ? '#E9D100' : rate >= 3 ? '#E97E00' : '#E90000';
    return (
      <div className="rate_color" style={{ border: `2px solid ${color}` }}>
        <span>{rate}</span>
      </div>
    );
  }
}
