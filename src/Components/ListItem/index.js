import React, { Fragment } from 'react';
import { Card } from 'antd';
const ListItem = ({ para }) => {
  return (
    <Fragment>
     <Card
      title={para.name}
    >
      <p>{para.name}</p>
      <p>{para.mobile}</p>
      <p>xyz123@gmail.com</p>
    </Card>
    </Fragment>
  )
}

export default ListItem;