import React from 'react';
import './index.css';
export default function ({title,...rest}) {
  return (
    <header {...rest} className="header">
      <h1>{title}</h1>
    </header>
  )
}