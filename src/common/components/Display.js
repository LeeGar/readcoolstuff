import React, { Component, PropTypes } from 'react';
import styles from "../base.scss";
import { Link, browserHistory } from 'react-router';

export default class Display extends Component {
  render() {
    const { query, results } = this.props
    console.log('value: ', 'results: ', results);
    return (
      <div className="innerDisplay">
        <h1> { query } </h1>
        <ul>
          {results.map((result, i) =>
            <li key={i}>
            <div className="name">{result.name}</div>
            <div className="username">{result.username}</div>
            <div className="text">{result.text}</div>
            <div className="location">{result.location}</div>
            <div className="createdAt">{result.createdAt}</div>
            <p></p>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

Display.propTypes = {
  results: PropTypes.array.isRequired,
  value: PropTypes.string
}
