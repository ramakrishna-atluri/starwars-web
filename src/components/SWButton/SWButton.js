import React from 'react';
import './SWButton.scss';
import { FaStar } from 'react-icons/fa';

export default class SWButton extends React.Component {
    render() {
      return (
        <button className={this.props.islocked? 'locked' : ''} onClick={() => this.props.action ? this.props.action() : ''}>
          <FaStar className="fa fa-5x fa-star icon left"/>Do. Or do not. There is no try.<FaStar className="fa fa-5x fa-star icon right"/>
        </button>
      );
    }
  }