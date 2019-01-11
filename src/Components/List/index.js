import React from 'react';
import ListItem from '../ListItem';

const List = ({ parameters }) => {
  const listItems = parameters.map((para) => {
    return <ListItem key={para.name} para={para} />
  });
  return (
    <ul>
      {
        listItems
      }
    </ul>
  );
};
export default List;