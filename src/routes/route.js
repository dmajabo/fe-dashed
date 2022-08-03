import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect, useLocation } from "react-router-dom";
import { supabase } from "supabaseClient";

const useQuery = () => {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
};

const AppRoute = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  ...rest
}) => {
  const location = useLocation();
  let query = useQuery();
  const user = supabase.auth.user();

  const getHeaderType = () => {
    if (location.pathname == "/story-board") {
      if (query.get("preview")) return "story";
      if (query.get("publish")) return "default";

      return "story";
    } else {
      return "deault";
    }
  };

  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthProtected && !localStorage.getItem("authUser") && !user) {
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
  );
};

AppRoute.propTypes = {
  isAuthProtected: PropTypes.bool,
  component: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any,
};

export default AppRoute;
