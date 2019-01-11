import React, { Fragment } from 'react';

const ListItem = (props) => {
  return (
    <Fragment>
      <li>{props.para.name}</li>
      <li>{props.para.mobile}</li>
    </Fragment>
  )
}

export default ListItem;