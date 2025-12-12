import React, { Component } from "react";
import Router from "next/router";

export default class Index2 extends Component {
  componentDidMount = () => {
    Router.push("/components");
  };

  render() {
    return <div />;
  }
}
