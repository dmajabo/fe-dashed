import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect, useLocation } from "react-router-dom";

const AppRoute = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  ...rest
}) => {

  const location = useLocation();

  const getHeaderType = () => {
    switch(location.pathname){
      case '/story-board':
        return 'story'
        default: 
        return 'default'
    }
  }

  return <Route
    {...rest}
    render={props => {
      if (isAuthProtected && !localStorage.getItem("authUser")) {
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }

      return (
        <Layout headerType={getHeaderType()}>
          <Component {...props} />
        </Layout>
      );
    }}
  />
};

AppRoute.propTypes = {
  isAuthProtected: PropTypes.bool,
  component: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any,
};

export default AppRoute;
