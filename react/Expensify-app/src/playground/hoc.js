// Higher-Order Component: (HOC) a component
// that renders another component
// goals are:
// 1. to re-use code
// 2. render hijacking
// 3. prop manipulation
// 4. abstract state

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (  // Regular component
    <div>
        <h1>Info</h1>
        <p>The info is {props.info}</p>
    </div>
);

const withAdminWarning = (WrappedComponent) => { // HOC Generator that modifies the passed component
  return (props) => (
    <div>
      {props.isAdmin && <p>This is private info. Please don't share!</p>}
      <WrappedComponent {...props}/>
    </div>
  );
};

const requireAuthentication = (WrappedComponent) => { 
  return (props) => (
    <div>
        {props.isAuthenticated ? <WrappedComponent {...props} /> : 
          <p>Please log in to view the info.</p>}
    </div>
  );
};

const AdminInfo = withAdminWarning(Info); //This is the HOC
const AuthInfo = requireAuthentication(Info);

// ReactDOM.render(<AdminInfo isAdmin={true} info='These are the details' />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={true} info='These are the details' />, document.getElementById('app'));