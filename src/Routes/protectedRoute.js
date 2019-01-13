import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const ProtectedRoute = ({
  component: Component,
  user,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (user) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};


export default ProtectedRoute; 