import React from 'react';
import './Pane.scss';


export default function Pane({children, style}:any){
  return <div className="Pane" style={style}>
    {children}
  </div>
}