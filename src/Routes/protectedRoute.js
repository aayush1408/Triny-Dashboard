import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const ProtectedRoute = ({
  component: Component,
  isAuthenticated,
  isAuthed,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthenticated) {
          return <Component {...props} isAuthed={isAuthed} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
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