import React, { Fragment } from 'react';
import { Card } from 'antd';
const ListItem = ({ para }) => {
  return (
    <Fragment>
      <Card
        size="small"
        title={para.name}
        style={{width:300}}
      >
        <p>{para.name}</p>
        <p>{para.mobile}</p>
        <p>xyz123@gmail.com</p>
      </Card>
    </Fragment>
  )
}

export default ListItem;