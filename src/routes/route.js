import React, { useEffect, useState } from "react";
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
  const [initializing, setInitializing] = useState(true);
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  const location = useLocation();
  let query = useQuery();

  useEffect(() => {
    setTimeout(() => {
      const session = supabase.auth.session();
      setSession(session);
      setUser(session?.user ?? null);
      setInitializing(false);
    }, 100);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  const getHeaderType = () => {
    if (location.pathname == "/story-board") {
      if (query.get("preview")) return "story";
      if (query.get("publish")) return "default";

      return "story";
    } else {
      return "deault";
    }
  };

  if (initializing) return null;

  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthProtected && !localStorage.getItem("authUser") && !session) {
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
