import React from 'react';
import ListItem from '../ListItem';
import './index.css'
const List = ({ parameters }) => {
  const listItems = parameters.map((para) => {
    return <ListItem key={para._id} para={para} />
  });
  return (
    <div className="container">
      {
        listItems
      }
      </div>
  );
};
export default List;