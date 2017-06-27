require('styles/AuthorSign.scss');
import React, { Component } from 'react';

class AuthorSign extends Component {
  constructor(props, context) {
    super(props, context);
    this.dataObj = {
      name: 'Landerqi',
      desc: 'hahaha, a front-end engineer'
    }

  }

  render() {

    return (
      <section className="author">
        <h1>{this.dataObj.name}</h1>
        <span>{this.dataObj.desc}</span>
      </section>
    );
  }
}

export default AuthorSign;
