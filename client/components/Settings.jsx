/*
    ./client/components/App.jsx
*/
import React from 'react';
import axios from 'axios';

export default class Settings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {message: ''};
  }

  componentWillMount() {

    var _this = this;

    axios
      .get("/settings")
      .then(function(result) {
        _this.setState({'message': result.data})
        console.log('ok', result);
      });
  }

  handleClick() {
    axios
      .post("/settings", {count: 2})
      .then(function(result) {
        console.log('ok', result);
      });
  }

  render() {
    return (
        <div>
          {this.state.message}
          <div onClick={this.handleClick}>Post</div>
        </div>
    );
  }
}
