import React, { Component } from 'react';



class User extends Component {

  render() {
    return (
      <div>
        <p>------------------</p>
        <p>{this.props.info.id}</p>
        <p>{this.props.info.firstName}</p>
        <p>{this.props.info.lastName}</p>
        <p>{this.props.info.email}</p>
      </div>
    );
  }
}

export default User;