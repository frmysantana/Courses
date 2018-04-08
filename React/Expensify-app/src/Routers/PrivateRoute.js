import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../Components/Header';

// Render the component for the private route if user is authenticated,
// redirect to login page otherwise
export const PrivateRoute = ({ 
  isAuthenticated, 
  component: Component,
  ...rest
}) => (
  <Route {...rest} component={(props) => (
    isAuthenticated ? (
      <div>
        <Header />
        <Component {...props} />
      </div>
    ) : (
      <Redirect to='/' />
    )
  )} />
);

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);