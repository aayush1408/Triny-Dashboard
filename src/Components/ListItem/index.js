import React, { Fragment } from 'react';

const ListItem = ({ para }) => {
  return (
    <Fragment>
      <li>{para.name}</li>
      <li>{para.mobile}</li>
    </Fragment>
  )
}

export default ListItem;