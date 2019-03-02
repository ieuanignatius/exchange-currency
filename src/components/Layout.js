import React, { Component } from 'react';
import { object } from 'prop-types';
import { renderRoutes } from "react-router-config";

class Layout extends Component {
  static propTypes = {
    route: object
  };

  render(){
    const { route } = this.props;

    return (
      <div className="layout">
        {renderRoutes(route.routes)}
      </div>
    );
  }
}

export default Layout;