import React from 'react';

const Project = (props) => (
  <div>
      <h1>A Thing I've Done</h1>
      <p>This page is for the item with id of {props.match.params.id}.</p>
  </div>
);

export default Project;